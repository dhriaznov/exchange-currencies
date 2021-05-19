import { parseDecimals } from './parseDecimals';

export const inputFormatter = (value: number | string | undefined) => {
  if (!value) {
    return '';
  }

  const splittedValue = value.toString().split('.');
  if (splittedValue && splittedValue[1]?.length > 2) {
    return parseDecimals(value);
  }

  return value.toString();
};
