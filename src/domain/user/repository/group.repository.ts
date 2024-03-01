import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostgresRepository } from 'src/share/database/repository';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { ErrorMessages } from 'src/share/common/constants/errors.constant';
import { Group } from './group.entity';
import { CreateGroupRequest } from 'src/domain/admin/interface/group_crud/create-group.interface';

@Injectable()
export class GroupRepository extends PostgresRepository<Group> {
  constructor(
    @InjectRepository(Group)
    private readonly _repo: Repository<Group>,
  ) {
    super(_repo);
  }

  async createGroup({name}:CreateGroupRequest): Promise<Group> {
    const group = await this.findOne('name', name);
    if (group) {
      throw new HttpException(
        ErrorMessages.USERNAME_EXISTS,
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return await this.save({
        name,
      });
    }
  }

    async listOfGroup(): Promise<Group[]> {
      const groups = await this.findAll();
      return groups;
    }

  //   async deleteUserByUserName(username: string): Promise<DeleteUser> {
  //     const result = await this.deleteByfield('username', username);

  //     return { affected: result.affected };
  //   }

  //   async updateUserByUserName(username: string, newData): Promise<DeleteUser> {
  //     const result = await this.updateByfield('username', username, newData);
  //     return { affected: result.affected };
  //   }
}
