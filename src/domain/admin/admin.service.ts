import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InitiateAdminDto } from './dto/initiate.dto';
import { UserRepository } from '../user/repository/user.repository';
import { signAccessToken } from 'src/share/common/utils/jwt-generator';
import { Role } from 'src/share/common/enums/role.enum';
import { ErrorMessages } from 'src/share/common/constants/errors.constant';
import { BaseResponse } from 'src/share/common/interface/baseResponse.interface';
import { CreateUserResponse } from './interface/user_crud/create-user.interface';
import { UserListResponse } from './interface/user_crud/user-list.interface';
import { CreateAdminResponse } from './interface/initiate-admin.interface';
import { GroupRepository } from '../user/repository/group.repository';
import { CreateGroupDto } from './dto/group_crud/create-group.dto';
import { CreateGroupResponse } from './interface/group_crud/create-group.interface';
import { GroupListResponse } from './interface/group_crud/group-list.interface';
import { Group } from '../user/repository/group.entity';

@Injectable()
export class AdminService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly groupRepository: GroupRepository,
  ) {}

  async createAdmin(
    body: InitiateAdminDto,
  ): Promise<BaseResponse<CreateAdminResponse>> {
    const user = await this.userRepository.createUser(body);
    const token = await signAccessToken(user, Role.ADMIN);
    return {
      success: true,
      data: {
        token: `Bearer ${token}`,
      },
    };
  }

  /////////// USER crud //////////

  async createUser(
    body: InitiateAdminDto,
  ): Promise<BaseResponse<CreateUserResponse>> {
    const user = await this.userRepository.createUser(body);
    const token = await signAccessToken(user, Role.USER);
    return {
      success: true,
      data: {
        token: `Bearer ${token}`,
      },
    };
  }

  async userList(): Promise<BaseResponse<UserListResponse>> {
    const users = await this.userRepository.listOfUser();
    return {
      success: true,
      data: {
        users,
      },
    };
  }

  async updateUser(username, newData): Promise<BaseResponse<boolean>> {
    await this.userRepository.updateUserByUserName({ username, newData });
    return {
      success: true,
      data: true,
    };
  }

  async deleteUser(username): Promise<BaseResponse<boolean>> {
    await this.userRepository.deleteUserByUserName(username);
    return {
      success: true,
      data: true,
    };
  }

  /////////// GROUP crud //////////

  async createGroup(
    body: CreateGroupDto,
  ): Promise<BaseResponse<CreateGroupResponse>> {
    await this.groupRepository.createGroup({ name: body.name });
    return {
      success: true,
      data: {
        message: `group created`,
      },
    };
  }

  async groupList(): Promise<BaseResponse<GroupListResponse<Group>>> {
    const group = await this.groupRepository.listOfGroup();
    return {
      success: true,
      data: {
        group,
      },
    };
  }

  async updateGroup(name, newData): Promise<BaseResponse<boolean>> {
    await this.groupRepository.updateGroupByName({ name, newData });
    return {
      success: true,
      data: true,
    };
  }


  async deleteGroup(name): Promise<BaseResponse<boolean>> {
    await this.groupRepository.deleteGroupByName(name);
    return {
      success: true,
      data: true,
    };
  }
}
