import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SYMBOL } from 'src/mock/mock';
import { Currency } from 'src/repository/currency.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CurrencySeedService {
  constructor(
    @InjectRepository(Currency)
    private currencyRepository: Repository<Currency>,
    private readonly httpClient: HttpService,
  ) {}

  async run() {
      await this.createCurrency()
  }

  private async createCurrency(): Promise<Partial<boolean>> {
    const queryRunner = this.currencyRepository.manager.connection.createQueryRunner();
    
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      for (const data of SYMBOL) {
        await queryRunner.manager.getRepository(Currency).save({ currency:data});
      }
      await queryRunner.commitTransaction();
      return true;
    } catch(err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
