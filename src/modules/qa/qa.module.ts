import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionService } from './question.service';
import { AnswerService } from './answer.service';
import { AnswerRepository } from './repository/answer.repository';
import { QuestionRepository } from './repository/question.repository';
import { JwtModule } from '@nestjs/jwt';
import { Answer } from './repository/asnwer.entity';
import { Question } from './repository/question.entity';
import { Topic } from '../topic/repository/topic.entity';
import { Section } from '../section/repository/section.entity';
import { TopicRepository } from '../topic/repository/topic.repository';
import { SectionModule } from '../section/section.module';
import { SectionRepository } from '../section/repository/section.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Section, Topic, Question, Answer]),
    JwtModule,
  ],
  controllers: [],
  providers: [
    AnswerService,
    QuestionService,
    AnswerRepository,
    QuestionRepository,
    TopicRepository,
    SectionRepository,
  ],
  exports: [
    AnswerService, // Make the AnswerService accessible to other modules
    QuestionService, // Make the QuestionService accessible to other modules
  ],
})
export class QaModule {}
