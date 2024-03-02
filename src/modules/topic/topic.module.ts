import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TopicService } from "./topic.service";
import { Section } from "../section/repository/section.entity";
import { Topic } from "./repository/topic.entity";
import { Question } from "../qa/repository/question.entity";
import { Answer } from "../qa/repository/asnwer.entity";
import { JwtModule } from "@nestjs/jwt";
import { TopicRepository } from "./repository/topic.repository";
import { SectionRepository } from "../section/repository/section.repository";
import { AnswerRepository } from "../qa/repository/answer.repository";
import { QuestionRepository } from "../qa/repository/question.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Section,Topic,Question,Answer]),JwtModule] ,
    controllers: [],
    providers: [TopicService,TopicRepository,SectionRepository,AnswerRepository,QuestionRepository],
    exports:[TopicService]
  })
  export class TopicModule {}
  
  