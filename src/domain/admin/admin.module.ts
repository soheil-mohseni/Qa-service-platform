import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { UserRepository } from "../user/repository/user.repository";

@Module({
    imports: [TypeOrmModule.forFeature([])] ,
    controllers: [AdminController],
    providers: [AdminService,UserRepository],
  })
  export class AdminModule {}
  
  