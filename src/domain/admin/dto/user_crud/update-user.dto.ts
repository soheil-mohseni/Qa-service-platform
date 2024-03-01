import { IsObject, IsString, isObject } from 'class-validator';

export class UpdateUserDtoParams {
  @IsString()
  username: string;
}

export class UpdateUserDtoBody {
  @IsString()
  username?: string;

  @IsString()
  password?: string;

  @IsObject()
  group?: {
    name: string
  } 
}
