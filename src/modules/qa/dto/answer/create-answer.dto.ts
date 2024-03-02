import {  IsString,  } from 'class-validator';

export class CreateAnswerDto {
  
  @IsString()
  titleName: string;

  @IsString()
  value: string;

}
