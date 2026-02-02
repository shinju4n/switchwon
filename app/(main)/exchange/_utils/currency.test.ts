import {
  sortForex,
  getCurrencyPair,
  EXCHANGE_TYPE_TEXT,
  ForexCurrency,
} from './currency';

describe('sortForex', () => {
  it('USD가 JPY보다 앞에 정렬됨', () => {
    const items = [
      { currency: 'JPY' as ForexCurrency, rate: 9.5 },
      { currency: 'USD' as ForexCurrency, rate: 1350 },
    ];

    const result = sortForex(items);

    expect(result[0].currency).toBe('USD');
    expect(result[1].currency).toBe('JPY');
  });

  it('이미 정렬된 배열은 그대로 유지', () => {
    const items = [
      { currency: 'USD' as ForexCurrency, rate: 1350 },
      { currency: 'JPY' as ForexCurrency, rate: 9.5 },
    ];

    const result = sortForex(items);

    expect(result[0].currency).toBe('USD');
    expect(result[1].currency).toBe('JPY');
  });

  it('원본 배열을 변경하지 않음 (불변성)', () => {
    const items = [
      { currency: 'JPY' as ForexCurrency, rate: 9.5 },
      { currency: 'USD' as ForexCurrency, rate: 1350 },
    ];

    const result = sortForex(items);

    // 원본 유지
    expect(items[0].currency).toBe('JPY');
    // 새 배열은 정렬됨
    expect(result[0].currency).toBe('USD');
    // 다른 참조
    expect(result).not.toBe(items);
  });

  it('빈 배열 처리', () => {
    const result = sortForex([]);
    expect(result).toEqual([]);
  });
});

describe('getCurrencyPair', () => {
  describe('buy (매수) - KRW로 외화 구매', () => {
    it('USD 매수 시 KRW → USD 반환', () => {
      const result = getCurrencyPair('buy', 'USD');
      expect(result).toEqual({
        fromCurrency: 'KRW',
        toCurrency: 'USD',
      });
    });

    it('JPY 매수 시 KRW → JPY 반환', () => {
      const result = getCurrencyPair('buy', 'JPY');
      expect(result).toEqual({
        fromCurrency: 'KRW',
        toCurrency: 'JPY',
      });
    });
  });

  describe('sell (매도) - 외화를 팔아 KRW 획득', () => {
    it('USD 매도 시 USD → KRW 반환', () => {
      const result = getCurrencyPair('sell', 'USD');
      expect(result).toEqual({
        fromCurrency: 'USD',
        toCurrency: 'KRW',
      });
    });

    it('JPY 매도 시 JPY → KRW 반환', () => {
      const result = getCurrencyPair('sell', 'JPY');
      expect(result).toEqual({
        fromCurrency: 'JPY',
        toCurrency: 'KRW',
      });
    });
  });
});

describe('EXCHANGE_TYPE_TEXT', () => {
  it('buy 타입의 텍스트가 올바름', () => {
    expect(EXCHANGE_TYPE_TEXT.buy.label).toBe('살래요');
    expect(EXCHANGE_TYPE_TEXT.buy.amountLabel).toBe('매수 금액');
    expect(EXCHANGE_TYPE_TEXT.buy.resultLabel).toBe('필요 원화');
    expect(EXCHANGE_TYPE_TEXT.buy.resultSuffix).toBe('원 필요해요');
    expect(EXCHANGE_TYPE_TEXT.buy.actionSuffix('달러')).toBe('달러 사기');
  });

  it('sell 타입의 텍스트가 올바름', () => {
    expect(EXCHANGE_TYPE_TEXT.sell.label).toBe('팔래요');
    expect(EXCHANGE_TYPE_TEXT.sell.amountLabel).toBe('매도 금액');
    expect(EXCHANGE_TYPE_TEXT.sell.resultLabel).toBe('받을 원화');
    expect(EXCHANGE_TYPE_TEXT.sell.resultSuffix).toBe('원 받을 수 있어요');
    expect(EXCHANGE_TYPE_TEXT.sell.actionSuffix('엔화')).toBe('엔화 팔기');
  });
});
