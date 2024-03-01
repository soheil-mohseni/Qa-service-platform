import {  IsString } from 'class-validator';

export class UpdateGroupDtoBodyParams {
  @IsString()
  name: string;
}

export class UpdateGroupDtoBody {
  @IsString()
  name?: string;
}
