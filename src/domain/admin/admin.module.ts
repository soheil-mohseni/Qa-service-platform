import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UserRepository } from '../user/repository/user.repository';
import { User } from '../user/repository/user.entity';
import { Group } from '../user/repository/group.entity';
import { JwtModule } from '@nestjs/jwt';
import { GroupRepository } from '../user/repository/group.repository';
import { SectionModule } from 'src/modules/section/section.module';
import { SectionService } from 'src/modules/section/section.service';
import { Section } from 'src/modules/section/repository/section.entity';
import { SectionRepository } from 'src/modules/section/repository/section.repository';
import { Topic } from 'src/modules/topic/repository/topic.entity';
import { Question } from 'src/modules/qa/repository/question.entity';
import { Answer } from 'src/modules/qa/repository/asnwer.entity';
import { TopicModule } from 'src/modules/topic/topic.module';
import { TopicRepository } from 'src/modules/topic/repository/topic.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Group, Section, Topic, Question, Answer]),
    JwtModule,
    SectionModule,
    TopicModule,
  ],
  controllers: [AdminController],
  providers: [
    AdminService,
    SectionService,
    UserRepository,
    GroupRepository,
    SectionRepository,
    TopicRepository,
  ],
  exports: [AdminService],
})
export class AdminModule {}
