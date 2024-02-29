import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { initiateAdminDto } from './dto/initiate.dto';
import { UserRepository } from '../user/repository/user.repository';
import { signAccessToken } from 'src/share/common/utils/jwt-generator';
import { Role } from 'src/share/common/enums/role.enum';
import { ErrorMessages } from 'src/share/common/constants/errors.constant';

@Injectable()
export class AdminService {
  constructor(private readonly userRepository: UserRepository) {}

  async createAdmin(body: initiateAdminDto): Promise<string> {
    try {
      const user = await this.userRepository.createAdmin(body);

      return await signAccessToken(user, Role.ADMIN);
    } catch (error) {
      throw new HttpException(
        ErrorMessages.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
