import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostgresRepository } from 'src/share/database/repository';
import { Repository } from 'typeorm';
import { ErrorMessages } from 'src/share/common/constants/errors.constant';
import { encryptString } from 'src/share/common/utils';
import { Section } from './section.entity';
import { CreateSectionRequest,  } from '../interface/create-section.interface';
import { DeleteSection, DeleteSectionRequest } from '../interface/delete-section.interface';
import { UpdateSection, UpdateSectionRequest } from '../interface/update-section.interface';
import { SectionNameList } from '../interface/section-list.interface';

@Injectable()
export class SectionRepository extends PostgresRepository<Section> {
  constructor(
    @InjectRepository(Section)
    private readonly _repo: Repository<Section>,
  ) {
    super(_repo);
  }

  async createSection(data: CreateSectionRequest): Promise<Section> {
    const {status , name } = data;
    const section = await this.findOne('name', name);
    if (section) {
      throw new HttpException(
        ErrorMessages.SECTION_EXISTS,
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return await this.save({
        name,
        status,
      });
    }
  }


  async findSection(field, value): Promise<Section> {
    const section = await this.findOne(field, value);    
    return section;
  }

  async listOfSection(): Promise<SectionNameList[]> {
    const section = await this.findAll();
    const sectionNameList = section.map((data) => {
      return { name: data.name };
    });
    return sectionNameList;
  }

  async deleteSectionByName(name: DeleteSectionRequest): Promise<DeleteSection> {
    const result = await this.deleteByfield('name', name);
    return { affected: result.affected };
  }

  async updateSectionByName({
    name,
    newData,
  }: UpdateSectionRequest): Promise<UpdateSection> {

    const result = await this.updateByfield('name', name, newData);
    return { affected: result.affected };
  }
}
