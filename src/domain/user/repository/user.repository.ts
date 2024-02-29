import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostgresRepository } from 'src/share/database/repository';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { ErrorMessages } from 'src/share/common/constants/errors.constant';

@Injectable()
export class UserRepository extends PostgresRepository<User> {
  constructor(
    @InjectRepository(User)
    private readonly _repo: Repository<User>,
  ) {
    super(_repo);
  }

  async createAdmin(data: InitiateAdminRequest): Promise<User> {
    const { username, password } = data;
    const user =await this.findOne('username',username) 
    if (user) {
      throw new HttpException(
        ErrorMessages.USERNAME_EXISTS,
        HttpStatus.BAD_REQUEST,
      );
    }else{
      return await this.save({
        username,
        password,
      });
    }
 
  }

 
}
