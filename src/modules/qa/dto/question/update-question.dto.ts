import { IsEnum, IsObject, IsString } from 'class-validator';
import { Status } from 'src/share/common/enums/status.enums';

export class UpdateQuestionDtoBodyParams {
  @IsString()
  title: string;
}

export class UpdateQuestionBodyDto {
  @IsString()
  title?: string;

  @IsObject()
  topic?: {
    name: string
  }

  @IsEnum(Status)
  status:Status
}
