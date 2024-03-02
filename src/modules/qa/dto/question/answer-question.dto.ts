import { IsString } from 'class-validator';

export class AnswerQuestionDto {
  @IsString()
  title: string;
}
