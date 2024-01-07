import { Module } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { CurrencySeedModule } from './currency/currency-seed.module';
import { Typeorm } from 'src/typeorm/typeorm.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    Typeorm,
    CurrencySeedModule,
  ],
})
export class SeedModule {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}
}
