import { IsEnum, IsObject, IsString } from 'class-validator';
import { Status } from 'src/share/common/enums/status.enums';

export class UpdateTopicDtoBodyParams {
  @IsString()
  name: string;
}

export class UpdateTopicBodyDto {
  @IsString()
  name?: string;

  @IsObject()
  section?: {
    name: string
  } 
}
