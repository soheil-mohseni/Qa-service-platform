import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QaService } from "./qa.service";

@Module({
    imports: [TypeOrmModule.forFeature([])] ,
    controllers: [],
    providers: [QaService],
  })
  export class QaModule {}
  
  