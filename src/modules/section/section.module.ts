import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SectionService } from "./section.service";

@Module({
    imports: [TypeOrmModule.forFeature([])] ,
    controllers: [],
    providers: [SectionService],
  })
  export class SectionModule {}
  
  