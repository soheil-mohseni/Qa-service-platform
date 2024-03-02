import { IsString } from 'class-validator';

export class likeIncrementsDto {
  @IsString()
  title: string;
}

