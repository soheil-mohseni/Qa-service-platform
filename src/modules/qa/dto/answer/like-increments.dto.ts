import { IsString } from 'class-validator';

export class LikeIncrementsDto {
  @IsString()
  value: string;
}

