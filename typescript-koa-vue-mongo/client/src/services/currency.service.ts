import currencies from '../assets/currencies';
import presetsOriginal from '../assets/presets';

export default {
  getCurrencySymbol(currencyCode: string): string {
    const currency = currencies.find((cur) => cur.code === currencyCode);
    return currency!.symbol;
  },
  convertToCurrency(sum: number, currentCurrency: string, desiredCurrency: string): number {
    if (sum === 0) {
      return 0;
    }

    if (currentCurrency === 'USD') {
      const currency = currencies.find(({ code }) => code === desiredCurrency);
      return Math.round(sum * currency!.rate);
    }

    // As there are no direct rates between currencies, we need to convert them to USD first
    const currency = currencies.find((cur) => cur.code === currentCurrency);

    const sumUSD = sum / currency!.rate;

    const desiredCur = currencies.find(({ code }) => code === desiredCurrency);

    return Math.round(sumUSD * desiredCur!.rate);
  },
  convertPresets(targetCurCode: string): Record<number, boolean> {
    if (targetCurCode === 'USD') {
      return presetsOriginal;
    }
    type presetsType = { [index: number]: boolean };
    const obj: presetsType = {};
    const presetsArr = Object.keys(presetsOriginal);
    presetsArr.forEach((amount) => {
      const newItemValue = this.convertToCurrency(
        +amount,
        'USD',
        targetCurCode,
      );
      const formattedItemValue = this.round(+newItemValue);
      obj[formattedItemValue] = false;
    });
    return obj;
  },
  round(num: number): number {
    let result = 0;
    if (num > 10 && num < 100) {
      result = Math.ceil(+num / 10) * 10;
    } else if (num >= 100 && num < 1000) {
      result = Math.ceil(+num / 100) * 100;
    } else if (num >= 1000 && num < 10000) {
      result = Math.ceil(+num / 1000) * 1000;
    } else if (num >= 10000) {
      result = Math.ceil(+num / 10000) * 10000;
    }
    return result;
  },
};
