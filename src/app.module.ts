import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { Typeorm } from './typeorm/typeorm.module';
import { CollectorModule } from './domain/collector/collector.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    CollectorModule,
    Typeorm
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
