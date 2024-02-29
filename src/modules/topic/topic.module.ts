import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TopicService } from "./topic.service";

@Module({
    imports: [] ,
    controllers: [],
    providers: [TopicService],
  })
  export class TopicModule {}
  
  