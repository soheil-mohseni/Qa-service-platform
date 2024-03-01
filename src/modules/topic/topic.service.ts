import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BaseResponse } from 'src/share/common/interface/baseResponse.interface';
import { CreateTopicResponse } from './interface/create-topic.interface';
import { TopicRepository } from './repository/topic.repository';
import { SectionRepository } from '../section/repository/section.repository';
import { TopicListResponse, TopicNameList } from './interface/topic-list.interface';
import { ErrorMessages } from 'src/share/common/constants/errors.constant';

@Injectable()
export class TopicService {
  constructor(
    private readonly topicRepository: TopicRepository,
    private readonly sectionRepository: SectionRepository,
  ) {}

  async createTopic(body): Promise<BaseResponse<CreateTopicResponse>> {
    const section = await this.sectionRepository.findSection("name",body.sectionName)
    if (section) {
      await this.topicRepository.createTopic({ name: body.name , section });
      return {
        success: true,
        data: {
          message: `topic created`,
        },
      };
    }else{
      throw new HttpException(
        ErrorMessages.SECTION_NOT_FOUND,
        HttpStatus.BAD_REQUEST,
      );
    }

  }


  async topicList(sort): Promise<
    BaseResponse<TopicListResponse<TopicNameList>>
  > {
    const topic = await this.topicRepository.listOfTopic(sort);
    return {
      success: true,
      data: {
        topic,
      },
    };
  }


  async updateTopic(name, newData): Promise<BaseResponse<boolean>> {
    await this.topicRepository.updateTopicByName({ name, newData });
    return {
      success: true,
      data: true,
    };
  }

  async deleteTopic(name): Promise<BaseResponse<boolean>> {
    await this.topicRepository.deleteTopicByName(name);
    return {
      success: true,
      data: true,
    };
  }
}
