import { AutoMap } from '@automapper/classes';

export class Product {
  @AutoMap() public id: string;
  @AutoMap() public name?: string;
  @AutoMap() public imageUrl?: string;
  @AutoMap() public isActive?: boolean;
  @AutoMap(() => Date) public createdAt?: Date;
  @AutoMap(() => Date) public updatedAt?: Date;
}
