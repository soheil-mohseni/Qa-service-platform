import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SectionService } from "./section.service";
import { SectionRepository } from "./repository/section.repository";
import { Section } from "./repository/section.entity";
import { Topic } from "../topic/repository/topic.entity";
import { Question } from "../qa/repository/question.entity";
import { Answer } from "../qa/repository/asnwer.entity";
import { AdminController } from "src/domain/admin/admin.controller";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [TypeOrmModule.forFeature([Section,Topic,Question,Answer]),JwtModule] ,
    controllers: [],
    providers: [SectionService,SectionRepository],
    exports:[SectionService]
  })
  export class SectionModule {}
  
  