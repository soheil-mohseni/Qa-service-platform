import { UnauthorizedException } from '@nestjs/common';
import { SYMBOL } from 'src/mock/mock';



/**
 * Asynchronously validates a list of currency symbols.
 * 
 * This function checks each currency symbol provided to determine if it is non-empty
 * and exists within a predefined set of valid symbols (presumably stored in `SYMBOL`).
 * It logs a message to the console and returns an error message for any invalid input.
 *
 */


const existnaceCurrencyVallidator = async (currency: string[]) => {
   
  const finalPartialCurrencies = await Promise.all(
    currency.filter((data: string, index: number) => {
      try {
        if (data === undefined || data === null) {
          console.log(data, 'data is null');
          return `you should send data of ${index}`;
        } else if (!SYMBOL.includes(data)) {
          console.log(data,SYMBOL.includes(data), 'data not found');
          return `${data} currency not found`;
        }
      } catch (error) {
        console.log(error, 'this error come from existnaceCurrencyVallidator ');
      }
    }),
  );
  return finalPartialCurrencies;
};

export default existnaceCurrencyVallidator;
    