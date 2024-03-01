import { IsString } from 'class-validator';

export class UpdateUserDtoParams {
  @IsString()
  username: string;
}

export class UpdateUserDtoBody {
  @IsString()
  username?: string;

  @IsString()
  password?: string;
}
