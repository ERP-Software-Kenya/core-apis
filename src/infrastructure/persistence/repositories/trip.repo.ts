import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo, DbException, Filter, PageableFilter } from '../../../common';
import { TripEntity, TripStopEntity, OrderEntity } from '../entities';
import { Trip } from '../../../application/modules/trips/domain';
import { DriverTripDetail, ITripRepo } from '../../../application/modules/trips/repositories/i-trip.repo';
import { ETripStatus } from '../../../application/shared/enums/e-trip-status';
import { ETripStopStatus } from '../../../application/shared/enums/e-trip-stop-status';
import { EOrderStatus } from '../../../application/shared/enums/e-order-status';

@Injectable()
export class TripRepo
  extends BaseRepo<TripEntity, Trip, string, PageableFilter<Trip>, Filter<Trip>>
  implements ITripRepo
{
  public constructor(
    @InjectRepository(TripEntity) internalRepo: Repository<TripEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(TripRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, TripEntity, Trip);
  }

  public override get idColumnName(): keyof TripEntity {
    return 'id';
  }

  public async findByStatusAsync(status: ETripStatus, organizationId: string): Promise<Trip[]> {
    try {
      const entities = await this.internalRepo
        .createQueryBuilder('trip')
        .innerJoin('trip.vehicle', 'vehicle')
        .where('trip.tripStatus = :status', { status })
        .andWhere('vehicle.companyId = :organizationId', { organizationId })
        .getMany();
      return this.mapToModelArray(entities);
    } catch (ex) {
      this.logger.error(ex);
      throw new DbException(ex);
    }
  }

  public async findByDriverAndDateAsync(
    driverId: string,
    startDate: Date,
    endDate: Date,
    statuses: ETripStatus[],
  ): Promise<Trip[]> {
    try {
      const entities = await this.internalRepo
        .createQueryBuilder('trip')
        .where('trip.driverId = :driverId', { driverId })
        .andWhere('trip.startDatetime >= :startDate', { startDate })
        .andWhere('trip.startDatetime <= :endDate', { endDate })
        .andWhere('trip.tripStatus IN (:...statuses)', { statuses })
        .getMany();
      return this.mapToModelArray(entities);
    } catch (ex) {
      this.logger.error(ex);
      throw new DbException(ex);
    }
  }

  public async findDetailForDriverAsync(tripId: string, driverId: string): Promise<DriverTripDetail | null> {
    try {
      const entity = await this.internalRepo.findOne({
        where: { id: tripId, driverId },
        relations: ['vehicle'],
      });
      if (!entity) return null;
      const stops = await this.internalRepo.manager.find(TripStopEntity, {
        where: { tripId },
        relations: ['order', 'order.customer'],
        order: { sequence: 'ASC' },
      });
      return {
        id: entity.id,
        tripNumber: entity.tripNumber,
        vehiclePlate: entity.vehicle?.vehicleNumber ?? '',
        status: entity.tripStatus,
        createdAt: entity.createdAt,
        stops: stops.map((stop) => ({
          stopId: stop.id,
          sequence: stop.sequence,
          customerName: stop.order?.customer?.name ?? '',
          customerEmail: stop.order?.customer?.email ?? '',
          address: stop.order?.customer?.address ?? '',
          status: stop.status,
          latitude: stop.latitude === undefined ? undefined : Number(stop.latitude),
          longitude: stop.longitude === undefined ? undefined : Number(stop.longitude),
        })),
      };
    } catch (ex) {
      this.logger.error(ex);
      throw new DbException(ex);
    }
  }

  public async createTripWithStopsAsync(
    driverId: string,
    vehicleId: string,
    stops: Array<{ orderId: string; sequence: number; latitude?: number; longitude?: number }>,
  ): Promise<Trip> {
    try {
      const tripNumber = `TRP-${Date.now()}`;
      const savedTrip = await this.internalRepo.manager.transaction(async (manager) => {
        const firstOrder = stops[0]
          ? await manager.findOneOrFail(OrderEntity, { where: { id: stops[0].orderId } })
          : null;
        const newTrip = manager.create(TripEntity, {
          tripNumber,
          vehicleId,
          driverId,
          customerId: firstOrder?.customerId ?? driverId,
          pickupLocation: 'warehouse',
          dropLocation: 'multi-stop',
          startDatetime: new Date(),
          tripStatus: ETripStatus.Scheduled,
          priority: 'medium',
        });
        const trip = await manager.save(TripEntity, newTrip);
        for (const stopInput of stops) {
          const stop = manager.create(TripStopEntity, {
            tripId: trip.id,
            orderId: stopInput.orderId,
            sequence: stopInput.sequence,
            latitude: stopInput.latitude,
            longitude: stopInput.longitude,
            status: ETripStopStatus.Pending,
          });
          await manager.save(TripStopEntity, stop);
          await manager.update(OrderEntity, stopInput.orderId, { status: EOrderStatus.InTransit });
        }
        return trip;
      });
      return this.mapToModel(savedTrip);
    } catch (ex) {
      this.logger.error(ex);
      throw new DbException(ex);
    }
  }
}
