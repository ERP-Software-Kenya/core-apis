import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { EmailTemplateEntity } from '../../../../infrastructure/persistence/entities/email-template.entity';
import { EmailTemplate } from '../domain';

@Injectable()
export class EmailTemplateProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  public get profile() {
    return (mapper: Mapper): void => {
      createMap(mapper, EmailTemplateEntity, EmailTemplate);
      createMap(mapper, EmailTemplate, EmailTemplateEntity);
    };
  }
}
