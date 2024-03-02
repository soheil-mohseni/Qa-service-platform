import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { QuestionRepository } from './repository/question.repository';
import { AnswerRepository } from './repository/answer.repository';
import { BaseResponse } from 'src/share/common/interface/baseResponse.interface';
import { CreateAnswerResponse } from './interface/answer/create-answer.interface';
import { ErrorMessages } from 'src/share/common/constants/errors.constant';

@Injectable()
export class AnswerService {
  constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly answerRepository: AnswerRepository,
  ) {}

  async createAnswer(body): Promise<BaseResponse<CreateAnswerResponse>> {
    const question = await this.questionRepository.findQuestion('title', body.titleName.trim());
    if (question) {
      await this.answerRepository.createAnswer({
        value: body.value,
        question,
      });
      return {
        success: true,
        data: {
          message: `answer created`,
        },
      };
    } else {
      throw new HttpException(
        ErrorMessages.QUESTION_NOT_FOUND,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  

  async likeIncrements(value): Promise<BaseResponse<boolean>> {
    await this.answerRepository.likeIncrements(value);
    return {
      success: true,
      data: true,
    };
  }

  async dislikeIncrements(value): Promise<BaseResponse<boolean>> {
    await this.answerRepository.dislikeIncrements(value);
    return {
      success: true,
      data: true,
    };
  }

  async deleteAnswer(value): Promise<BaseResponse<boolean>> {
    await this.answerRepository.deleteAnswerByName(value);
    return {
      success: true,
      data: true,
    };
  }

  async updateAnswer(value, newData): Promise<BaseResponse<boolean>> {
    await this.answerRepository.updateAnswerByValue({ value, newData });
    return {
      success: true,
      data: true,
    };
  }

}
