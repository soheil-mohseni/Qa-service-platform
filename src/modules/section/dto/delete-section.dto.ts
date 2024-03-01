import { IsString } from 'class-validator';

export class DeleteSectionDto {
  @IsString()
  name: string;
}
