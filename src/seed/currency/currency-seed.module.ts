import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HttpModule } from '@nestjs/axios';
import { Currency } from 'src/repository/currency.entity';
import { CurrencySeedService } from './currency-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Currency]), HttpModule],
  providers: [CurrencySeedService],
  exports: [CurrencySeedService],
})
export class CurrencySeedModule {}
