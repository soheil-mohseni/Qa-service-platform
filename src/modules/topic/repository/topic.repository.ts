import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostgresRepository } from 'src/share/database/repository';
import { Repository } from 'typeorm';
import { ErrorMessages } from 'src/share/common/constants/errors.constant';
import { CreateTopicRequest } from '../interface/create-topic.interface';
import { Topic } from './topic.entity';
import { TopicNameList } from '../interface/topic-list.interface';
import {
  DeleteTopic,
  DeleteTopicRequest,
} from '../interface/delete-topic.interface';
import { Sort } from 'src/share/common/enums/sort.enum';
import {
  UpdateTopic,
  UpdateTopicRequest,
} from '../interface/update-topic.interface';
import { SectionRepository } from 'src/modules/section/repository/section.repository';

@Injectable()
export class TopicRepository extends PostgresRepository<Topic> {
  constructor(
    @InjectRepository(Topic)
    private readonly _repo: Repository<Topic>,
    private readonly sectionRepository: SectionRepository,
  ) {
    super(_repo);
  }

  async createTopic(data: CreateTopicRequest): Promise<Topic> {
    const { section, name } = data;
    const topic = await this.findOne('name', name);
    if (topic) {
      throw new HttpException(
        ErrorMessages.TOPICEXISTS,
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return await this.save({
        name,
        section,
      });
    }
  }

  async listOfTopic(sort: Sort): Promise<TopicNameList[]> {
    const topics = await this._repo
      .createQueryBuilder('topic')
      .leftJoinAndSelect('topic.section', 'section')
      .orderBy('section.name', sort)
      .addOrderBy('topic.name', 'ASC')
      .getMany();
      
      const topicNameList = topics.map((data) => {
      console.log(data);
      return { name: data.name, section: data.section.name };
    });
    return topicNameList;
  }

  async deleteTopicByName(name: DeleteTopicRequest): Promise<DeleteTopic> {
    const result = await this.deleteByfield('name', name);
    return { affected: result.affected };
  }

  async updateTopicByName({
    name,
    newData,
  }: UpdateTopicRequest): Promise<UpdateTopic> {
    if (newData?.section?.name) {
      const section = await this.sectionRepository.findSection(
        'name',
        newData.section.name,
      );
      newData.section['id'] = newData.section['name'];
      delete newData.section['name'];
      newData.section['id'] = section;
    }

    const result = await this.updateByfield('name', name, newData);
    return { affected: result.affected };
  }
}
