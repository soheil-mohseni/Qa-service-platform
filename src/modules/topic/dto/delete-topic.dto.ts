import { IsString } from 'class-validator';

export class DeleteTopicDto {
  @IsString()
  name: string;
}
