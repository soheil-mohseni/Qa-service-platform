import { IsString } from 'class-validator';

export class DeleteGroupDto {
  @IsString()
  name: string;
}
