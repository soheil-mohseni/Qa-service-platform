import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InitiateAdminDto } from './dto/initiate.dto';
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
    body: InitiateAdminDto,
  ): Promise<BaseResponse<CreateAdmin>> {
    const user = await this.userRepository.createUser(body);
    const token = await signAccessToken(user, Role.ADMIN);
    return {
      success: true,
      data: {
        token: `Bearer ${token}`,
      },
    };
    
  } 


  async createUser(
    body: InitiateAdminDto,
  ): Promise<BaseResponse<CreateAdmin>> {
    const user = await this.userRepository.createUser(body);
    const token = await signAccessToken(user, Role.USER);
    return {
      success: true,
      data: {
        token: `Bearer ${token}`,
      },
    };
    
  } 
}
