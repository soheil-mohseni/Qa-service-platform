import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { Typeorm } from './share/common/typeorm/typeorm.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './share/common/middleware/logger/logger.middleware';
import { UserModule } from './domain/user/user.module';
import { AdminModule } from './domain/admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    UserModule,
    AdminModule,
    Typeorm
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
