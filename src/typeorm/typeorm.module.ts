import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (ConfigService: ConfigService) => ({
                type: "postgres" ,
                url: ConfigService.getOrThrow("DB_URI"),
                autoLoadEntities: true ,
                synchronize: ConfigService.getOrThrow("synchronize_mode")
            }) ,
            inject: [ConfigService] ,
        }) ,
    ] ,
})
export class Typeorm {
    constructor(private dateSource: DataSource){}
}