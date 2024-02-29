import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostgresRepository } from 'src/share/database/repository';
import { Repository } from 'typeorm';
import { User } from './user.entity';

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
    return await this.save({
      username,
      password,
    });
  }

 
}
