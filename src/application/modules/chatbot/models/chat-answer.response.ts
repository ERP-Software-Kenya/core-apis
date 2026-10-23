import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class ChatAnswerResponse {
  @ApiProperty({ description: 'The generated answer from the ERP assistant' })
  @AutoMap()
  public answer: string;

  @ApiProperty({ description: 'Knowledge-base document titles referenced in the answer', type: [String] })
  @AutoMap(() => [String])
  public sources: string[];
}
