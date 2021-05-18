import { CurrenciesType } from './Currencies';

export type RatesType =  {
  [key in keyof CurrenciesType]?: {
    [key in keyof CurrenciesType]: number
  }
};
