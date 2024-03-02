import { IsEnum, IsString,  } from 'class-validator';
import { Status } from 'src/share/common/enums/status.enums';

export class CreateQuestionDto {
  
  @IsString()
  topicName: string;

  @IsString()
  title: string;

  @IsEnum(Status)
  status?:Status

}
