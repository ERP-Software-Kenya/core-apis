import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo, Filter, PageableFilter } from '../../../common';
import { NotificationEntity } from '../entities';
import { Notification } from '../../../application/modules/notifications/domain';
import { INotificationRepo, NotificationFilter } from '../../../application/modules/notifications';

@Injectable()
export class NotificationRepo extends BaseRepo<NotificationEntity, Notification, string, PageableFilter<NotificationFilter>, Filter<NotificationFilter>> implements INotificationRepo {
  constructor(
    @InjectRepository(NotificationEntity) internalRepo: Repository<NotificationEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(NotificationRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, NotificationEntity, Notification);
  }

  public override get idColumnName(): keyof NotificationEntity {
    return 'id';
  }
}
