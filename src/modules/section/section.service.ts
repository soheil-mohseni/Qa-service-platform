import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { BaseResponse } from 'src/share/common/interface/baseResponse.interface';
import { CreateSectionResponse } from './interface/create-section.interface';
import { SectionRepository } from './repository/section.repository';
import {
  SectionListResponse,
  SectionNameList,
} from './interface/section-list.interface';
import { Status } from 'src/share/common/enums/status.enums';

@Injectable()
export class SectionService {
  constructor(private readonly sectionRepository: SectionRepository) {}

  async createSection(
    body: CreateSectionDto,
  ): Promise<BaseResponse<CreateSectionResponse>> {
    await this.sectionRepository.createSection({
      name: body.name,
      status: body?.status ?? Status.PUBLIC,
    });
    return {
      success: true,
      data: {
        message: `section created`,
      },
    };
  }

  async sectionList(): Promise<
    BaseResponse<SectionListResponse<SectionNameList>>
  > {
    const section = await this.sectionRepository.listOfSection();
    return {
      success: true,
      data: {
        section,
      },
    };
  }

  async updateSection(name, newData): Promise<BaseResponse<boolean>> {
    await this.sectionRepository.updateSectionByName({ name, newData });
    return {
      success: true,
      data: true,
    };
  }

  async deleteSection(name): Promise<BaseResponse<boolean>> {
    await this.sectionRepository.deleteSectionByName(name);
    return {
      success: true,
      data: true,
    };
  }
}
