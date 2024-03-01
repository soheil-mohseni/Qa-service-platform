import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostgresRepository } from 'src/share/database/repository';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { ErrorMessages } from 'src/share/common/constants/errors.constant';
import { encryptString } from 'src/share/common/utils';
import {
  UserList,
  UserListResponse,
} from 'src/domain/admin/interface/user-list.interface';
import { DeleteUser } from 'src/domain/admin/interface/delete-user.interface';
import { Group } from './group.entity';

@Injectable()
export class GroupRepository extends PostgresRepository<Group> {
  constructor(
    @InjectRepository(User)
    private readonly _repo: Repository<User>,
  ) {
    super(_repo);
  }

  async createGroup(name: InitiateAdminRequest): Promise<User> {
    const user = await this.findOne('name', name);
    if (user) {
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

  async listOfUser(): Promise<UserList[]> {
    const users = await this.findAll();
    const usernameList = users.map((data) => {
      return { username: data.username, group: data?.group?.name ?? null };
    });
    return usernameList;
  }

  async deleteUserByUserName(username: string): Promise<DeleteUser> {
    const result = await this.deleteByfield('username', username);

    return { affected: result.affected };
  }

  async updateUserByUserName(username: string, newData): Promise<DeleteUser> {
    const result = await this.updateByfield('username', username, newData);
    return { affected: result.affected };
  }
}
