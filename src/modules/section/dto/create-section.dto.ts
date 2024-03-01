import { IsEnum, IsString } from 'class-validator';
import { Status } from 'src/share/common/enums/status.enums';

export class CreateSectionDto {
  
  @IsString()
  name: string;

  @IsEnum(Status)
  status?: Status;
}
