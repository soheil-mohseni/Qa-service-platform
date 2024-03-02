import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostgresRepository } from 'src/share/database/repository';
import { Repository } from 'typeorm';
import { ErrorMessages } from 'src/share/common/constants/errors.constant';
import { Answer } from './asnwer.entity';
import { CreateAnswerRequest } from '../interface/answer/create-answer.interface';
import {
  QuestionAnswerList,
  QuestionAnswerListRequest,
} from '../interface/answer/question-answerlist.interface';
import { DisLikeIncrementsRequest } from '../interface/answer/dislike-incremets.interface';
import {
  LikeIncrements,
  LikeIncrementsRequest,
} from '../interface/answer/like-incremets.interface';
import { DeleteAnswer, DeleteAnswerRequest } from '../interface/answer/delete-answer.interface';
import { UpdateAnswerRequest, updateAnswer } from '../interface/answer/update-answer.interface';
import { QuestionRepository } from './question.repository';

  @Injectable()
  export class AnswerRepository extends PostgresRepository<Answer> {
    constructor(
      @Inject(forwardRef(() => QuestionRepository))
      private readonly questionRepository: QuestionRepository,
      @InjectRepository(Answer)
      private readonly _repo: Repository<Answer>,
    ) {
      super(_repo);
    }

  async createAnswer(data: CreateAnswerRequest): Promise<Answer> {
    const { question, value } = data;
    const answer = await this.findOne('value', value);
    if (answer) {
      throw new HttpException(
        ErrorMessages.TOPICEXISTS,
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return await this.save({
        value:value.trim(),
        question,
      });
    }
  }

  async answerListOfQuestion(
    questionId: QuestionAnswerListRequest,
  ): Promise<QuestionAnswerList[]> {
    const answer = await this.findAll({
      where: {
        question: questionId,
      },
    });
    const finalAnswer = answer.map((data) => {
      return {
        like: data.like,
        dislike: data.dislike,
        value: data.value,
      };
    });
    return finalAnswer;
  }

  async deleteAnswerByName(
    value: DeleteAnswerRequest,
  ): Promise<DeleteAnswer> {
    const result = await this.deleteByfield('value', value);
    return { affected: result.affected };
  }

  async updateAnswerByValue({
    value,
    newData,
  }: UpdateAnswerRequest): Promise<updateAnswer> {
    if (newData?.question?.title) {
      const question = await this.questionRepository.findQuestion(
        'title',
        newData.question.title,
      );
      
      newData.question['id'] = newData.question['value'];
      delete newData.question['value'];
      newData.question['id'] = question;
    }

    const result = await this.updateByfield('value', value, newData);
    return { affected: result.affected };
  }

  async likeIncrements(value: LikeIncrementsRequest): Promise<LikeIncrements> {
    const likeCount = await this.findOne('value', value.value);
    const result = await this.updateByfield('value', value, {
      like: ++likeCount.like,
    });
    return { affected: result.affected };
  }

  async dislikeIncrements(
    value: DisLikeIncrementsRequest,
  ): Promise<LikeIncrements> {
    const likeCount = await this.findOne('value', value.value);
    const result = await this.updateByfield('value', value, {
      dislike: ++likeCount.dislike,
    });

    return { affected: result.affected };
  }
}
