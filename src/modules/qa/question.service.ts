import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BaseResponse } from 'src/share/common/interface/baseResponse.interface';
import { CreateQuestionResponse } from './interface/question/create-question.interface';
import { TopicRepository } from '../topic/repository/topic.repository';
import { QuestionRepository } from './repository/question.repository';
import { Status } from 'src/share/common/enums/status.enums';
import { ErrorMessages } from 'src/share/common/constants/errors.constant';
import {
  QuestionListResponse,
  QuestionNameList,
} from './interface/question/question-list.interface';
import { Question } from './repository/question.entity';

@Injectable()
export class QuestionService {
  constructor(
    private readonly topicRepository: TopicRepository,
    private readonly questionRepository: QuestionRepository,
  ) {}

  async createQuestion(body): Promise<BaseResponse<CreateQuestionResponse>> {
    const topic = await this.topicRepository.findTopic('name', body.topicName?.trim());
    if (topic) {
      await this.questionRepository.createQuestion({
        title: body.title,
        topic: topic,
        status: body?.status ?? Status.PUBLIC,
      });
      return {
        success: true,
        data: {
          message: `question created`,
        },
      };
    } else {
      throw new HttpException(
        ErrorMessages.TOPIC_NOT_FOUND,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async questionList(
    sort,
  ): Promise<BaseResponse<QuestionListResponse<QuestionNameList>>> {
    const question = await this.questionRepository.listOfQuestion(sort);
    return {
      success: true,
      data: {
        question,
      },
    };
  }

  async findAnswerOfQuestion(title): Promise<BaseResponse<any>> {
    const result = await this.questionRepository.findQuestionAnswer(title);
    return {
      success: true,
      data: {
        result,
      },
    };
  }

  async findAnswerOfAllQuestion(): Promise<BaseResponse<any>> {
    const result = await this.questionRepository.findAllQuestionAnswer();
    return {
      success: true,
      data: result
    };
  }


  async searchQeustion(searchText): Promise<BaseResponse<Question[]>> {
    const result =
      await this.questionRepository.searchQuestionsByTitle(searchText);
    return {
      success: true,
      data: result,
    };
  }

  async likeIncrements(title): Promise<BaseResponse<boolean>> {
    await this.questionRepository.likeIncrements(title);
    return {
      success: true,
      data: true,
    };
  }

  async dislikeIncrements(title): Promise<BaseResponse<boolean>> {
    await this.questionRepository.dislikeIncrements(title);
    return {
      success: true,
      data: true,
    };
  }

  async viewIncrements(title): Promise<BaseResponse<boolean>> {
    await this.questionRepository.viewIncrements(title);
    return {
      success: true,
      data: true,
    };
  }

  async deleteQuestion(title): Promise<BaseResponse<boolean>> {
    await this.questionRepository.deleteQuestionByName(title);
    return {
      success: true,
      data: true,
    };
  }

  async updateQuestion(title, newData): Promise<BaseResponse<boolean>> {
    await this.questionRepository.updateQuestionByName({ title, newData });
    return {
      success: true,
      data: true,
    };
  }

}
