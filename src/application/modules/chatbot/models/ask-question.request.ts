import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class AskQuestionRequest {
  @ApiProperty({ description: 'The question to ask the ERP assistant', maxLength: 1000 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  @AutoMap()
  public question: string;
}
