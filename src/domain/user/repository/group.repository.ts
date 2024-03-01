import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostgresRepository } from 'src/share/database/repository';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { ErrorMessages } from 'src/share/common/constants/errors.constant';
import { Group } from './group.entity';
import { CreateGroupRequest } from 'src/domain/admin/interface/group_crud/create-group.interface';
import {
  DeleteGroup,
  DeleteGroupRequest,
} from 'src/domain/admin/interface/group_crud/delete-group.interface';
import {
  UpdateGroup,
  UpdateGroupRequest,
} from 'src/domain/admin/interface/group_crud/update-group.interface';

@Injectable()
export class GroupRepository extends PostgresRepository<Group> {
  constructor(
    @InjectRepository(Group)
    private readonly _repo: Repository<Group>,
  ) {
    super(_repo);
  }

  async createGroup({ name }: CreateGroupRequest): Promise<Group> {
    const group = await this.findOne('name', name);
    if (group) {
      throw new HttpException(
        ErrorMessages.GROUP_EXISTS,
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return await this.save({
        name,
      });
    }
  }
  async findGroup(field, value): Promise<Group> {
    const group = await this.findOne(field, value);    
    return group;
  }

  async listOfGroup(): Promise<Group[]> {
    const groups = await this.findAll();
    return groups;
  }

  async deleteGroupByName(name: DeleteGroupRequest): Promise<DeleteGroup> {
    const result = await this.deleteByfield('name', name);
    return { affected: result.affected };
  }

  async updateGroupByName({
    name,
    newData,
  }: UpdateGroupRequest): Promise<UpdateGroup> {
    const result = await this.updateByfield('name', name, newData);
    return { affected: result.affected };
  }
}
