import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostgresRepository } from 'src/share/database/repository';
import { Repository } from 'typeorm';
import { ErrorMessages } from 'src/share/common/constants/errors.constant';
import { Sort } from 'src/share/common/enums/sort.enum';
import { Question } from './question.entity';
import { TopicRepository } from 'src/modules/topic/repository/topic.repository';
import { CreateQuestionRequest } from '../interface/question/create-question.interface';
import { QuestionNameList } from '../interface/question/question-list.interface';
import {
  DeleteQuestion,
  DeleteQuestionRequest,
} from '../interface/question/delete-question.interface';
import {
  UpdateQuestionRequest,
  updateQuestion,
} from '../interface/question/update-question.interface';
import {
  LikeIncrements,
  LikeIncrementsRequest,
} from '../interface/question/like-incremets.interface';
import { DisLikeIncrementsRequest } from '../interface/question/dislike-incremets.interface';
import { AnswerRepository } from './answer.repository';
import { QuestionAnswerList } from '../interface/answer/question-answerlist.interface';

@Injectable()
export class QuestionRepository extends PostgresRepository<Question> {
  constructor(
    @InjectRepository(Question)
    private readonly _repo: Repository<Question>,
    private readonly TopicRepository: TopicRepository,
    private readonly answerRepository: AnswerRepository,
  ) {
    super(_repo);
  }

  async createQuestion(data: CreateQuestionRequest): Promise<Question> {
    const { topic, status, title } = data;
    const question = await this.findOne('title', title);
    if (question) {
      throw new HttpException(
        ErrorMessages.QUESTION_EXISTS,
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return await this.save({
        topic,
        status,
        title:title.trim(),
      });
    }
  }

  async listOfQuestion(sort: Sort): Promise<QuestionNameList[]> {
    const questions = await this._repo
      .createQueryBuilder('question')
      .leftJoinAndSelect('question.topic', 'topic')
      .orderBy('topic.name', sort)
      .addOrderBy('question.title', 'ASC')
      .getMany();

    const questionList = questions.map((data) => {
      return {
        title: data.title,
        view: data.view,
        like: data.like,
        dislike: data.dislike,
        status: data.status,
        topic: data.topic.name,
      };
    });
    return questionList;
  }

  async deleteQuestionByName(
    title: DeleteQuestionRequest,
  ): Promise<DeleteQuestion> {
    const result = await this.deleteByfield('title', title);
    return { affected: result.affected };
  }

  async updateQuestionByName({
    title,
    newData,
  }: UpdateQuestionRequest): Promise<updateQuestion> {
    if (newData?.topic?.name) {
      const topic = await this.TopicRepository.findTopic(
        'name',
        newData.topic.name,
      );
      newData.topic['id'] = newData.topic['name'];
      delete newData.topic['name'];
      newData.topic['id'] = topic;
    }

    const result = await this.updateByfield('title', title, newData);
    return { affected: result.affected };
  }

  async likeIncrements(title: LikeIncrementsRequest): Promise<LikeIncrements> {
    const likeCount = await this.findQuestion('title', title.title);
    const result = await this.updateByfield('title', title, {
      like: ++likeCount.like,
    });

    return { affected: result.affected };
  }

  async dislikeIncrements(
    title: DisLikeIncrementsRequest,
  ): Promise<LikeIncrements> {
    const likeCount = await this.findQuestion('title', title.title);
    const result = await this.updateByfield('title', title, {
      dislike: ++likeCount.dislike,
    });

    return { affected: result.affected };
  }

  async viewIncrements(
    title: DisLikeIncrementsRequest,
  ): Promise<LikeIncrements> {
    const view = await this.findQuestion('title', title.title);
    const result = await this.updateByfield('title', title, {
      view: ++view.view,
    });

    return { affected: result.affected };
  }

  async searchQuestionsByTitle(searchText: string): Promise<Question[]> {
    const questions = await this._repo
      .createQueryBuilder('question')
      .where('LOWER(question.title) LIKE :searchText', {
        searchText: `%${searchText.toLowerCase()}%`,
      })
      .getMany();

    return questions;
  }

  async findQuestion(field, value): Promise<Question> {
    const question = await this.findOne(field, value);
    return question;
  }

  async findQuestionAnswer(value): Promise<any> {
    const question = await this.findOne('title', value,['topic']);
    const answer: QuestionAnswerList[] =
      await this.answerRepository.answerListOfQuestion({ id: question.id });
    return {
      question: question.title,
      like: question.like,
      dislike: question.dislike,
      view: question.view,
      status: question.status,
      topic: question.topic.name,
      answer,
    };
  }
  async findAllQuestionAnswer(): Promise<any[]> {
    const question = await this.findWithRelations({relations:{
      topic: true
    }});

    
    const result = await Promise.all(question.map(async (data) => {
      const answer: QuestionAnswerList[] =
        await this.answerRepository.answerListOfQuestion({ id: data.id });
      return {
        question: data.title,
        like: data.like,
        dislike: data.dislike,
        view: data.view,
        status: data.status,
        topic: data.topic.name,
        answer,
      };
    }));
    
    return result;
  }
}
