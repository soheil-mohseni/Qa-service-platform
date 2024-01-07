import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CollectorDto } from './dto/collector.dto';
import { CollectorResponse } from './interface/collectorResponse.interface';
import existnaceCurrencyVallidator from 'src/helper/existnaceCurrencyVallidator';
import { DOLLOR } from 'src/mock/mock';

@Injectable()
export class CollectorService {
  constructor() {}

  /**
   * Converts an amount from one currency to another using predefined conversion rates.
   *
   * This async method takes an object containing details for the conversion process,
   * including the source currency, the target currency, and the amount to be converted.
   * It validates the provided currencies, calculates the conversion if the currencies
   * are valid, and returns the converted amount in the specified currency.
   *
   * @param {CollectorDto} collector - An object containing the following properties:
   *   asset_currency: The currency code of the amount to be converted.
   *   converted_currency: The target currency code for conversion.
   *   amount: The numerical amount to convert from asset_currency to converted_currency.
   * @returns {Promise<CollectorResponse>} A promise that resolves to an object containing
   *   the converted value, or rejects with an HTTP exception if an error occurs.
   */

  async convertor(collector: CollectorDto): Promise<CollectorResponse> {
    const { asset_currency, converted_currency, amount } = collector;
    try {
      const partialOfCurrencies: string[] = await existnaceCurrencyVallidator([
        asset_currency,
        converted_currency,
      ]);
      if (partialOfCurrencies.length === 0) {
        const multiplicationValueOfCurrency =
          DOLLOR[asset_currency] * DOLLOR[converted_currency];
        const divisionValueOfCurrency = amount / multiplicationValueOfCurrency;
        return {
          value: `${divisionValueOfCurrency}${converted_currency}`,
        };
      } else {
        throw new HttpException(
          `currency not found : {${partialOfCurrencies.map(
            (data: string) => data,
          )}}`,
          HttpStatus.FAILED_DEPENDENCY,
        );
      }
    } catch (error) {
      console.log(error);
      throw new HttpException('system was crashed', HttpStatus.BAD_GATEWAY);
    }
  }
}
