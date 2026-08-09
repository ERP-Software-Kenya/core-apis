import { AutoMap } from '@automapper/classes';

export class Language {
  @AutoMap() public code: string;
  @AutoMap() public name: string;
}
