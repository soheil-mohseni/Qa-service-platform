import { Module } from "@nestjs/common";
import { CollectorController } from "./collector.controller";
import { CollectorService } from "./collector.service";

@Module({
    imports: [] ,
    controllers: [CollectorController],
    providers: [CollectorService],
  })
  export class CollectorModule {}
  
  