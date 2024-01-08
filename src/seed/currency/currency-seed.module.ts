import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HttpModule } from '@nestjs/axios';
import { Currency } from '../../repository/currency.entity';
import { CurrencySeedService } from './currency-seed.service';
import { Typeorm } from '../../typeorm/typeorm.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Currency]),
    HttpModule,
    Typeorm,
    ConfigModule.forRoot({ envFilePath: '.env' }),
  ],
  providers: [CurrencySeedService],
  exports: [CurrencySeedService],
})
export class CurrencySeedModule {}
