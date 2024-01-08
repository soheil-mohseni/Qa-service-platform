import { Module } from "@nestjs/common";
import { CollectorController } from "./collector.controller";
import { CollectorService } from "./collector.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Currency } from "src/repository/currency.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Currency])] ,
    controllers: [CollectorController],
    providers: [CollectorService],
  })
  export class CollectorModule {}
  
  