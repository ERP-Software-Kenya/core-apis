import { AutoMap } from '@automapper/classes';

export class EmailTemplate {
  @AutoMap() public id: string;
  @AutoMap() public slug: string;
  @AutoMap() public name: string;
  @AutoMap() public subject: string;
  @AutoMap() public htmlBody: string;
  @AutoMap() public category?: string;
  @AutoMap() public isActive: boolean;
  @AutoMap(() => Date) public createdAt: Date;
  @AutoMap(() => Date) public updatedAt?: Date;
}
