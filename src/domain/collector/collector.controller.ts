import { Controller, Get, Request, Query } from '@nestjs/common';
import { CollectorService } from './collector.service';

@Controller('currency')
export class CollectorController {
  constructor(private readonly collectorService: CollectorService) {}

  @Get('convertor')
  async getUserBalance(@Request() req, @Query() param) {
    const { amount, asset_currency, converted_currency } = param;
    return this.collectorService.convertor({
      amount,
      asset_currency,
      converted_currency,
    });
  }
}
