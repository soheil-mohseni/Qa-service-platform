import { Module } from '@nestjs/common';
import { InjectDataSource, TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Typeorm } from '../typeorm/typeorm.module';
import { ConfigModule } from '@nestjs/config';
import { Currency } from '../repository/currency.entity';
import { CurrencySeedModule } from './currency/currency-seed.module';

@Module({
  imports: [
    Typeorm,
    // ConfigModule.forRoot({ isGlobal: true }),
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forFeature([Currency]),
    CurrencySeedModule,
  ],
})
export class SeedModule {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}
}
