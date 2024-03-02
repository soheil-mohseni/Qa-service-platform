import { IsString } from 'class-validator';

export class dislikeIncrementsDto {
  @IsString()
  title: string;
}

