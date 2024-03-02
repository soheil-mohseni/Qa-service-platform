import { Topic } from 'src/modules/topic/repository/topic.entity';
import { Status } from 'src/share/common/enums/status.enums';

export interface CreateQuestionRequest {
  title: string;
  topic: Topic;
  status?: Status;
}

export interface CreateQuestionResponse {
  message: string;
}
