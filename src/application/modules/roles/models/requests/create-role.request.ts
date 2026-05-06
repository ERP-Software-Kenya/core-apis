import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsString, IsUUID } from 'class-validator';

export class CreateRoleRequest {
  @ApiProperty() @IsNotEmpty() @IsUUID() @AutoMap() public organizationId: string;
  @ApiProperty() @IsNotEmpty() @IsString() @AutoMap() public name: string;
  @ApiProperty() @IsNotEmpty() @IsObject() @AutoMap() public permissions: Record<string, any>;
}
