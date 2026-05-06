import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CqrsMediator } from '../../../common';
import { IPageable } from '../../../common';
import { CreateNotificationCommand, DeleteNotificationCommand, UpdateNotificationCommand } from './commands';
import { Notification } from './domain';
import { CreateNotificationRequest, SearchNotificationsRequest, ListNotificationsRequest, NotificationResponse, NotificationsPagedResponse, UpdateNotificationRequest } from './models';
import { GetNotificationQuery, ListNotificationsQuery, SearchNotificationsQuery } from './queries';

@ApiBearerAuth()
@ApiTags('Notifications')
@Controller({ path: 'notifications', version: '1' })
export class NotificationsController {
  constructor(
    protected readonly mediator: CqrsMediator,
    @InjectMapper() protected readonly mapper: Mapper,
    @InjectPinoLogger(NotificationsController.name) protected readonly logger: PinoLogger,
  ) {}

  @ApiOperation({ summary: 'Search notifications (paginated)' })
  @ApiOkResponse({ type: NotificationsPagedResponse })
  @HttpCode(HttpStatus.OK)
  @Get()
  public async search(@Query() filter?: SearchNotificationsRequest): Promise<NotificationsPagedResponse> {
    const query = this.mapper.map(filter, SearchNotificationsRequest, SearchNotificationsQuery);
    const result = await this.mediator.execute<SearchNotificationsQuery, IPageable<Notification>>(query);
    return {
      ...result,
      items: this.mapper.mapArray(result.items, Notification, NotificationResponse),
    };
  }

  @ApiOperation({ summary: 'List all notifications' })
  @ApiOkResponse({ type: [NotificationResponse] })
  @HttpCode(HttpStatus.OK)
  @Get('list')
  public async list(@Query() filter?: ListNotificationsRequest): Promise<NotificationResponse[]> {
    const query = this.mapper.map(filter, ListNotificationsRequest, ListNotificationsQuery);
    const result = await this.mediator.execute<ListNotificationsQuery, Notification[]>(query);
    return this.mapper.mapArray(result, Notification, NotificationResponse);
  }

  @ApiOperation({ summary: 'Get notification by ID' })
  @ApiOkResponse({ type: NotificationResponse })
  @ApiParam({ name: 'id', description: 'Notification UUID' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async getById(@Param('id') id: string): Promise<NotificationResponse> {
    const query = new GetNotificationQuery();
    query.id = id;
    const result = await this.mediator.execute<GetNotificationQuery, Notification>(query);
    return this.mapper.map(result, Notification, NotificationResponse);
  }

  @ApiOperation({ summary: 'Create a new notification' })
  @ApiCreatedResponse({ type: NotificationResponse })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async create(@Body() body: CreateNotificationRequest): Promise<NotificationResponse> {
    const command = this.mapper.map(body, CreateNotificationRequest, CreateNotificationCommand);
    const result  = await this.mediator.execute<CreateNotificationCommand, Notification>(command);
    return this.mapper.map(result, Notification, NotificationResponse);
  }

  @ApiOperation({ summary: 'Update a notification' })
  @ApiOkResponse({ type: NotificationResponse })
  @ApiParam({ name: 'id', description: 'Notification UUID' })
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  public async update(@Param('id') id: string, @Body() body: UpdateNotificationRequest): Promise<NotificationResponse> {
    const command = this.mapper.map(body, UpdateNotificationRequest, UpdateNotificationCommand);
    command.id    = id;
    const result  = await this.mediator.execute<UpdateNotificationCommand, Notification>(command);
    return this.mapper.map(result, Notification, NotificationResponse);
  }

  @ApiOperation({ summary: 'Delete a notification' })
  @ApiOkResponse({ type: Boolean })
  @ApiParam({ name: 'id', description: 'Notification UUID' })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<boolean> {
    const command = new DeleteNotificationCommand();
    command.id    = id;
    return this.mediator.execute<DeleteNotificationCommand, boolean>(command);
  }
}
