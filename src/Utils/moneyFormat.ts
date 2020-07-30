import currency from 'currency.js';
export default class MoneyFormat {
  static VND = (value: number) =>
    currency(value, {symbol: '', precision: 0}).format() + ' VND';
}
