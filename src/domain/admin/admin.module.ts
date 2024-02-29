import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UserRepository } from '../user/repository/user.repository';
import { User } from '../user/repository/user.entity';
import { Group } from '../user/repository/group.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User, Group]), JwtModule],
  controllers: [AdminController],
  providers: [AdminService, UserRepository],
  exports: [AdminService],
})
export class AdminModule {}
