import { CurrenciesType } from './Currencies';

export type AccountType =  {
  [key in keyof CurrenciesType]: number
};
