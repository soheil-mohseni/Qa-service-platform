import { IsString } from 'class-validator';

export class CreateTopicDto {
  
  @IsString()
  sectionName: string;

  @IsString()
  name: string;
}
