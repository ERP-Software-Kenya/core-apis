import { Body, Controller, ForbiddenException, Get, HttpCode, HttpStatus, Inject, NotFoundException, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import {
  AuthenticatedUser,
  ClerkAuthGuard,
  CqrsMediator,
  CurrentUser,
  Roles,
  RolesGuard,
  requireOrganizationId,
} from '../../../common';
import { ERole } from '../../../infrastructure';
import { ETripStopStatus } from '../../shared/enums/e-trip-stop-status';
import { DRIVER_REPO, TRIP_REPO } from '../../constants';
import { Driver } from '../drivers/domain';
import { IDriverRepo } from '../drivers/repositories/i-driver.repo';
import { Trip } from '../trips/domain';
import { DriverTripDetail, ITripRepo } from '../trips/repositories/i-trip.repo';
import {
  CreateMultiStopTripCommand,
  UpdateTripStatusCommand,
  UpdateDriverLocationCommand,
  InitiateDeliveryOtpCommand,
  InitiateDeliveryOtpResult,
  ConfirmDeliveryOtpCommand,
  ResendDeliveryOtpCommand,
  ResendDeliveryOtpResult,
} from './commands';
import {
  GetDriverTripsTodayQuery,
  DriverTripItem,
  GetFleetLiveLocationsQuery,
  FleetLiveLocation,
} from './queries';
import {
  CreateMultiStopTripRequest,
  UpdateTripStatusRequest,
  UpdateDriverLocationRequest,
  ConfirmDeliveryOtpRequest,
} from './models/requests';
import { DriverTripDetailResponse, DriverTripResponse, FleetLiveLocationResponse, OtpInitiatedResponse } from './models/responses';

@ApiBearerAuth()
@ApiTags('Trip Operations')
@UseGuards(ClerkAuthGuard, RolesGuard)
@Controller({ path: 'field-ops', version: '1' })
export class TripOperationsController {
  public constructor(
    protected readonly mediator: CqrsMediator,
    @Inject(DRIVER_REPO) private readonly driverRepo: IDriverRepo,
    @Inject(TRIP_REPO) private readonly tripRepo: ITripRepo,
    @InjectPinoLogger(TripOperationsController.name) protected readonly logger: PinoLogger,
  ) {}

  @ApiOperation({ summary: 'Create a multi-stop delivery trip' })
  @ApiOkResponse({ type: Boolean })
  @Roles(ERole.OrgAdmin, ERole.SuperAdmin)
  @HttpCode(HttpStatus.CREATED)
  @Post('trips')
  public async createMultiStopTrip(
    @Body() body: CreateMultiStopTripRequest,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<boolean> {
    const organizationId = requireOrganizationId(user);
    const command = new CreateMultiStopTripCommand();
    command.driverId = body.driverId;
    command.vehicleId = body.vehicleId;
    command.organizationId = organizationId;
    command.stops = body.stops;
    await this.mediator.execute<CreateMultiStopTripCommand, Trip>(command);
    return true;
  }

  @ApiOperation({ summary: 'Get trips assigned to driver for today' })
  @ApiOkResponse({ type: [DriverTripResponse] })
  @Roles(ERole.Driver)
  @HttpCode(HttpStatus.OK)
  @Get('driver/trips/today')
  public async getDriverTripsToday(
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<DriverTripResponse[]> {
    const organizationId = requireOrganizationId(user);
    const driver = await this.currentDriver(user);
    const query = new GetDriverTripsTodayQuery();
    query.driverId = driver.id;
    query.organizationId = organizationId;
    const items = await this.mediator.execute<GetDriverTripsTodayQuery, DriverTripItem[]>(query);
    return items.map((item) => ({
      id: item.id,
      tripNumber: item.tripNumber,
      tripStatus: item.tripStatus,
      startDatetime: item.startDatetime,
      stopCount: item.stopCount,
    }));
  }

  @ApiOperation({ summary: 'Get one trip assigned to the authenticated driver' })
  @ApiOkResponse({ type: DriverTripDetailResponse })
  @Roles(ERole.Driver)
  @HttpCode(HttpStatus.OK)
  @Get('driver/trips/:id')
  public async getDriverTrip(
    @Param('id') id: string,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<DriverTripDetailResponse> {
    const driver = await this.currentDriver(user);
    const detail = await this.tripRepo.findDetailForDriverAsync(id, driver.id);
    if (!detail) throw new NotFoundException('Trip is not assigned to the authenticated driver');
    return this.toDriverTripDetail(detail);
  }

  @ApiOperation({ summary: 'Update trip status' })
  @ApiOkResponse({ type: Boolean })
  @ApiParam({ name: 'id', description: 'Trip UUID' })
  @Roles(ERole.Driver)
  @HttpCode(HttpStatus.OK)
  @Patch('trips/:id/status')
  public async updateTripStatus(
    @Param('id') id: string,
    @Body() body: UpdateTripStatusRequest,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<boolean> {
    const driver = await this.currentDriver(user);
    await this.assertOwnedTrip(id, driver.id);
    const command = new UpdateTripStatusCommand();
    command.tripId = id;
    command.driverId = driver.id;
    command.status = body.status;
    await this.mediator.execute<UpdateTripStatusCommand, Trip>(command);
    return true;
  }

  @ApiOperation({ summary: 'Update driver live location' })
  @ApiOkResponse({ type: Boolean })
  @ApiParam({ name: 'id', description: 'Trip UUID' })
  @Roles(ERole.Driver)
  @HttpCode(HttpStatus.OK)
  @Post('trips/:id/location')
  public async updateDriverLocation(
    @Param('id') id: string,
    @Body() body: UpdateDriverLocationRequest,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<boolean> {
    const organizationId = requireOrganizationId(user);
    const driver = await this.currentDriver(user);
    await this.assertOwnedTrip(id, driver.id);
    const command = new UpdateDriverLocationCommand();
    command.tripId = id;
    command.driverId = driver.id;
    command.latitude = body.latitude;
    command.longitude = body.longitude;
    command.accuracy = body.accuracy;
    command.organizationId = organizationId;
    await this.mediator.execute<UpdateDriverLocationCommand, void>(command);
    return true;
  }

  @ApiOperation({ summary: 'Get fleet live locations' })
  @ApiOkResponse({ type: [FleetLiveLocationResponse] })
  @Roles(ERole.OrgAdmin, ERole.SuperAdmin)
  @HttpCode(HttpStatus.OK)
  @Get('fleet/live-locations')
  public async getFleetLiveLocations(
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<FleetLiveLocationResponse[]> {
    const organizationId = requireOrganizationId(user);
    const query = new GetFleetLiveLocationsQuery();
    query.organizationId = organizationId;
    const items = await this.mediator.execute<GetFleetLiveLocationsQuery, FleetLiveLocation[]>(query);
    return items.map((item) => ({
      tripId: item.tripId,
      driverId: item.driverId,
      vehicleId: item.vehicleId,
      latitude: item.latitude,
      longitude: item.longitude,
      gpsTime: item.gpsTime,
    }));
  }

  @ApiOperation({ summary: 'Initiate delivery OTP for a stop' })
  @ApiOkResponse({ type: OtpInitiatedResponse })
  @ApiParam({ name: 'tripId', description: 'Trip UUID' })
  @ApiParam({ name: 'stopId', description: 'Stop UUID' })
  @Roles(ERole.Driver)
  @HttpCode(HttpStatus.OK)
  @Post('trips/:tripId/stops/:stopId/initiate-delivery')
  public async initiateDelivery(
    @Param('tripId') tripId: string,
    @Param('stopId') stopId: string,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<OtpInitiatedResponse> {
    const organizationId = requireOrganizationId(user);
    const driver = await this.currentDriver(user);
    await this.assertOwnedTrip(tripId, driver.id);
    const command = new InitiateDeliveryOtpCommand();
    command.tripId = tripId;
    command.stopId = stopId;
    command.driverUserId = this.requireDbUserId(user);
    command.organizationId = organizationId;
    const result = await this.mediator.execute<InitiateDeliveryOtpCommand, InitiateDeliveryOtpResult>(command);
    return { maskedEmail: result.maskedEmail };
  }

  @ApiOperation({ summary: 'Confirm delivery with OTP' })
  @ApiOkResponse({ type: Boolean })
  @ApiParam({ name: 'tripId', description: 'Trip UUID' })
  @ApiParam({ name: 'stopId', description: 'Stop UUID' })
  @Roles(ERole.Driver)
  @HttpCode(HttpStatus.OK)
  @Post('trips/:tripId/stops/:stopId/confirm-delivery')
  public async confirmDelivery(
    @Param('tripId') tripId: string,
    @Param('stopId') stopId: string,
    @Body() body: ConfirmDeliveryOtpRequest,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<boolean> {
    const driver = await this.currentDriver(user);
    await this.assertOwnedTrip(tripId, driver.id);
    const command = new ConfirmDeliveryOtpCommand();
    command.tripId = tripId;
    command.stopId = stopId;
    command.otp = body.otp;
    command.driverUserId = this.requireDbUserId(user);
    return this.mediator.execute<ConfirmDeliveryOtpCommand, boolean>(command);
  }

  @ApiOperation({ summary: 'Resend delivery OTP for a stop' })
  @ApiOkResponse({ type: OtpInitiatedResponse })
  @ApiParam({ name: 'tripId', description: 'Trip UUID' })
  @ApiParam({ name: 'stopId', description: 'Stop UUID' })
  @Roles(ERole.Driver)
  @HttpCode(HttpStatus.OK)
  @Post('trips/:tripId/stops/:stopId/resend-otp')
  public async resendOtp(
    @Param('tripId') tripId: string,
    @Param('stopId') stopId: string,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<OtpInitiatedResponse> {
    const organizationId = requireOrganizationId(user);
    const driver = await this.currentDriver(user);
    await this.assertOwnedTrip(tripId, driver.id);
    const command = new ResendDeliveryOtpCommand();
    command.tripId = tripId;
    command.stopId = stopId;
    command.driverUserId = this.requireDbUserId(user);
    command.organizationId = organizationId;
    const result = await this.mediator.execute<ResendDeliveryOtpCommand, ResendDeliveryOtpResult>(command);
    return { maskedEmail: result.maskedEmail };
  }

  private async currentDriver(user: AuthenticatedUser): Promise<Driver> {
    const driver = await this.driverRepo.findByUserIdAsync(this.requireDbUserId(user));
    if (!driver || driver.organizationId !== requireOrganizationId(user)) {
      throw new ForbiddenException('The account is not linked to a driver profile in this organization');
    }
    return driver;
  }

  private async assertOwnedTrip(tripId: string, driverId: string): Promise<void> {
    const trip = await this.tripRepo.getAsync(tripId);
    if (!trip || trip.driverId !== driverId) {
      throw new NotFoundException('Trip is not assigned to the authenticated driver');
    }
  }

  private requireDbUserId(user: AuthenticatedUser): string {
    if (!user.dbUserId) throw new ForbiddenException('Authenticated user is not synchronized');
    return user.dbUserId;
  }

  private toDriverTripDetail(detail: DriverTripDetail): DriverTripDetailResponse {
    const currentStopId = detail.stops.find((stop) => stop.status !== ETripStopStatus.Delivered)?.stopId;
    return {
      id: detail.id,
      tripNumber: detail.tripNumber,
      vehiclePlate: detail.vehiclePlate,
      status: detail.status,
      stopCount: detail.stops.length,
      deliveredCount: detail.stops.filter((stop) => stop.status === ETripStopStatus.Delivered).length,
      createdAt: detail.createdAt,
      stops: detail.stops.map((stop) => ({
        stopId: stop.stopId,
        sequence: stop.sequence,
        customerName: stop.customerName,
        customerEmail: stop.customerEmail,
        address: stop.address,
        latitude: stop.latitude ?? 0,
        longitude: stop.longitude ?? 0,
        status: stop.status === ETripStopStatus.Delivered ? 'delivered' : stop.stopId === currentStopId ? 'current' : 'pending',
      })),
    };
  }
}
