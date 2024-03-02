import { IsEnum,  } from 'class-validator';
import { Sort } from 'src/share/common/enums/sort.enum';

export class QuestionListDto {
  @IsEnum(Sort)
  sort: Sort;
}
