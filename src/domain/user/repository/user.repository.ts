import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostgresRepository } from 'src/share/database/repository';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { ErrorMessages } from 'src/share/common/constants/errors.constant';
import { encryptString } from 'src/share/common/utils';
import { UserList } from 'src/domain/admin/interface/user_crud/user-list.interface';
import {
  DeleteUser,
  DeleteUserRequest,
} from 'src/domain/admin/interface/user_crud/delete-user.interface';
import {
  UpdateUser,
  UpdateUserRequest,
} from 'src/domain/admin/interface/user_crud/update-user.interface';
import { CreateUserRequest } from 'src/domain/admin/interface/user_crud/create-user.interface';
import { Group } from './group.entity';
import { GroupRepository } from './group.repository';

@Injectable()
export class UserRepository extends PostgresRepository<User> {
  constructor(
    @InjectRepository(User)
    private readonly _repo: Repository<User>,
    private readonly groupRepository: GroupRepository,
  ) {
    super(_repo);
  }

  async createUser(data: CreateUserRequest): Promise<User> {
    const { username, password } = data;
    const user = await this.findOne('username', username);
    if (user) {
      throw new HttpException(
        ErrorMessages.USERNAME_EXISTS,
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const hashedString = await encryptString(password);

      return await this.save({
        username,
        password: hashedString,
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

  async deleteUserByUserName(username: DeleteUserRequest): Promise<DeleteUser> {
    const result = await this.deleteByfield('username', username);

    return { affected: result.affected };
  }

  async updateUserByUserName({
    username,
    newData,
  }: UpdateUserRequest): Promise<UpdateUser> {
    if (newData?.group?.name) {
      const group = await this.groupRepository.findGroup('name', newData.group.name);
      newData.group['id'] = newData.group['name'];
      delete newData.group['name'];
      newData.group['id'] = group;
    }

    const result = await this.updateByfield('username', username, newData);
    return { affected: result.affected };
  }
}
