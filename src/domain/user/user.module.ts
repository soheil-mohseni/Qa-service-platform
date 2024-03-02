import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './repository/user.entity';
import { QaModule } from 'src/modules/qa/qa.module';
import { QuestionRepository } from 'src/modules/qa/repository/question.repository';
import { AnswerRepository } from 'src/modules/qa/repository/answer.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Question } from 'src/modules/qa/repository/question.entity';
import { Answer } from 'src/modules/qa/repository/asnwer.entity';
import { TopicRepository } from 'src/modules/topic/repository/topic.repository';
import { Topic } from 'src/modules/topic/repository/topic.entity';
import { Section } from 'src/modules/section/repository/section.entity';
import { SectionRepository } from 'src/modules/section/repository/section.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Question, Answer, Topic, Section]),
    QaModule,
    JwtModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    QuestionRepository,
    AnswerRepository,
    TopicRepository,
    SectionRepository,
  ],
})
export class UserModule {}
