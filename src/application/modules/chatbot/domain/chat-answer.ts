import { AutoMap } from '@automapper/classes';

export class ChatAnswer {
  @AutoMap() public answer: string;
  @AutoMap(() => [String]) public sources: string[];
}
