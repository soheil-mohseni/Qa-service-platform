import { Module } from '@nestjs/common';
import { Typeorm } from './typeorm/typeorm.module';
import { CollectorModule } from './domain/collector/collector.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    Typeorm,
    CollectorModule,
  ],
})
export class AppModule {}
