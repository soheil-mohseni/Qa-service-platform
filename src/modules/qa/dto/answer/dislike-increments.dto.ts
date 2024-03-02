import { IsString } from 'class-validator';

export class DislikeIncrementsDto {
  @IsString()
  value: string;
}

