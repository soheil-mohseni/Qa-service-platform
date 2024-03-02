import { IsString } from 'class-validator';

export class ViewIncrementsDto {
  @IsString()
  title: string;
}

