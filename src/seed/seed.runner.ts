import { SeedModule } from './seed.module';
import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { CurrencySeedService } from './currency/currency-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);
  const dataSource = app.get(DataSource);
  await dataSource.synchronize();
  await app.get(CurrencySeedService).run();
  await app.close();
};

void runSeed();
