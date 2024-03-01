import { IsEnum, IsString } from 'class-validator';
import { Sort } from 'src/share/common/enums/sort.enum';

export class ListTopicDto {
  @IsEnum(Sort)
  sort: Sort;
}
