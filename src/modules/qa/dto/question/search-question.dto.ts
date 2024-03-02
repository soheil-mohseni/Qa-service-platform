import { IsString } from 'class-validator';

export class SearchQuestionDto {
  @IsString()
  searchText: string;
}
