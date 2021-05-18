export const parseDecimals = (value: number | string) =>
  (parseInt((+value * 100).toString()) / 100).toFixed(2);
