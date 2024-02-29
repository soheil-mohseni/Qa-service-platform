import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });
  app.setGlobalPrefix('/api', {
    exclude: ['/'],
  });
  app.enableVersioning({
    prefix: 'v',
    type: VersioningType.URI,
  });
  const configService = app.get(ConfigService);
  await app.listen(3000);
}
bootstrap();
