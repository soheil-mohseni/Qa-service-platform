import {  IsObject, IsString } from 'class-validator';

export class UpdateAnswerDtoBodyParams {
  @IsString()
  value: string;
}

export class UpdateAnswerBodyDto {
  @IsString()
  value?: string;

  @IsObject()
  question?: {
    title: string
  } 
}
