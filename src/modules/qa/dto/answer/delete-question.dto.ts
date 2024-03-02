import { IsString } from 'class-validator';

export class DeleteAnswerDto {
  @IsString()
  value: string;
}
