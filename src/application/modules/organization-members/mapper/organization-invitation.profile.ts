import { createMap, forMember, ignore, mapFrom, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { OrganizationInvitationEntity } from '../../../../infrastructure';
import { OrganizationInvitation } from '../domain';
import { OrganizationInvitationResponse } from '../models';
import { CreateInvitationRequest } from '../models/requests';
import { CreateInvitationCommand } from '../commands';

@Injectable()
export class OrganizationInvitationProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) { super(mapper); }

  public get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, OrganizationInvitationEntity, OrganizationInvitation,
        forMember((dest) => dest.organizationName, mapFrom((src) => src.organization?.name ?? '')),
        forMember((dest) => dest.roleName, mapFrom((src) => src.role?.name ?? '')),
        forMember((dest) => dest.locationName, mapFrom((src) => src.location?.name)),
      );
      // Reverse: domain → entity. Derived fields (names from relations) have no
      // matching column on the entity and must be ignored.
      createMap(mapper, OrganizationInvitation, OrganizationInvitationEntity,
        forMember((dest) => dest.organization, ignore()),
        forMember((dest) => dest.role, ignore()),
        forMember((dest) => dest.location, ignore()),
        forMember((dest) => dest.invitedBy, ignore()),
      );
      createMap(mapper, OrganizationInvitation, OrganizationInvitationResponse);
      createMap(mapper, CreateInvitationRequest, CreateInvitationCommand);
    };
  }
}
