import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { initiateAdminDto } from './dto/initiate.dto';
import { UserRepository } from '../user/repository/user.repository';
import { signAccessToken } from 'src/share/common/utils/jwt-generator';
import { Role } from 'src/share/common/enums/role.enum';
import { ErrorMessages } from 'src/share/common/constants/errors.constant';
import { BaseResponse } from 'src/share/common/interface/baseResponse.interface';
import { CreateAdmin } from './interface/create-admin.interface';

@Injectable()
export class AdminService {
  constructor(private readonly userRepository: UserRepository) {}

  async createAdmin(
    body: initiateAdminDto,
  ): Promise<BaseResponse<CreateAdmin>> {
    const user = await this.userRepository.createAdmin(body);
    const token = await signAccessToken(user, Role.ADMIN);
    return {
      success: true,
      data: {
        token: `Bearer ${token}`,
      },
    };
  }
}
