import { IsEnum, IsString } from 'class-validator';
import { Status } from 'src/share/common/enums/status.enums';

export class UpdateSectionDtoBodyParams {
  @IsString()
  name: string;
}

export class UpdateSectionBodyDto {
  @IsString()
  name?: string;

  @IsEnum(Status)
  status?: Status;
}
