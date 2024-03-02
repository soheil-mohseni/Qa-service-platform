import { IsString } from 'class-validator';

export class DeleteQuestionDto {
  @IsString()
  title: string;
}
