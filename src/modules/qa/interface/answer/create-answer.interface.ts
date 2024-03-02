import { Section } from 'src/modules/section/repository/section.entity';
import { Status } from 'src/share/common/enums/status.enums';
import { Question } from '../../repository/question.entity';

export interface CreateAnswerRequest {
  value: string;
  question: Question;
}

export interface CreateAnswerResponse {
  message: string;
}
