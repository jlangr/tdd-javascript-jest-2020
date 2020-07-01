import * as Portfolio from './portfolio'
import {createPortfolio} from './portfolio'

const BAYER = 'BAYN';
const APPLE = 'AAPL';

describe('a portfolio', () => {
  let portfolio

  beforeEach(() => {
    portfolio = createPortfolio()
  })

  describe('emptiness', () => {
    it('empty by default', () => {
      expect(Portfolio.isEmpty(portfolio)).toBeTruthy()
    })

    it('not empty after purchase', () => {
      const updatedPortfolio = Portfolio.purchase(portfolio)

      expect(Portfolio.isEmpty(updatedPortfolio)).toBeFalsy()
    })
  })

  describe('unique symbol count', () => {
    it('is empty when no purchases made', () => {
      expect(Portfolio.uniqueSymbolCount(portfolio)).toEqual(0)
    })

    it('is 1 for single-symbol purchase', () => {
      const updatedPortfolio = Portfolio.purchase(portfolio)

      expect(Portfolio.uniqueSymbolCount(updatedPortfolio)).toEqual(1)
    })

    it('increments when purchasing multiple symbols', () => {
      let updatedPortfolio = Portfolio.purchase(portfolio, BAYER)
      updatedPortfolio = Portfolio.purchase(updatedPortfolio, APPLE)

      expect(Portfolio.uniqueSymbolCount(updatedPortfolio)).toEqual(2)
    })

    it('does not increment when purchasing already-held symbol', () => {
      let updatedPortfolio = Portfolio.purchase(portfolio, BAYER)
      updatedPortfolio = Portfolio.purchase(updatedPortfolio, BAYER)

      expect(Portfolio.uniqueSymbolCount(updatedPortfolio)).toEqual(1)
    })
  })

  describe('share tracking', () => {
    // ZOMbies
    it('returns 0 when symbol never purchased', () => {
      let updatedPortfolio = Portfolio.purchase(portfolio, BAYER, 0)

      expect(Portfolio.sharesOf(updatedPortfolio, BAYER)).toEqual(0)
    })

    it('returns shares of symbol', () => {
      let updatedPortfolio = Portfolio.purchase(portfolio, BAYER, 10)

      expect(Portfolio.sharesOf(updatedPortfolio, BAYER)).toEqual(10)
    })

    // this test passed immediately
    it('stores shares by symbol', () => {
      let updatedPortfolio = Portfolio.purchase(portfolio, BAYER, 10)
      updatedPortfolio = Portfolio.purchase(updatedPortfolio, APPLE, 15)

      expect(Portfolio.sharesOf(updatedPortfolio, BAYER)).toEqual(10)
      expect(Portfolio.sharesOf(updatedPortfolio, APPLE)).toEqual(15)
    })

    it('returns total of shares for multiple symbol purchases', () => {
      let updatedPortfolio = Portfolio.purchase(portfolio, BAYER, 10)
      updatedPortfolio = Portfolio.purchase(updatedPortfolio, BAYER, 32)

      expect(Portfolio.sharesOf(updatedPortfolio, BAYER)).toEqual(10 + 32)
    })
  })

  describe('selling', () => {
    it('returns total of shares for multiple symbol purchases', () => {
      let updatedPortfolio = Portfolio.purchase(portfolio, BAYER, 10)
      updatedPortfolio = Portfolio.sell(updatedPortfolio, BAYER, 3)

      expect(Portfolio.sharesOf(updatedPortfolio, BAYER)).toEqual(7)
    })

    it('removes holding after selling all', () => {
      let updatedPortfolio = Portfolio.purchase(portfolio, BAYER, 10)
      updatedPortfolio = Portfolio.sell(updatedPortfolio, BAYER, 10)

      expect(Portfolio.uniqueSymbolCount(updatedPortfolio)).toEqual(0)
    })

    it('throws when selling too many', () => {
      const purchasedShares = 10
      let updatedPortfolio = Portfolio.purchase(portfolio, BAYER, purchasedShares)

      expect(() => Portfolio.sell(updatedPortfolio, BAYER, purchasedShares + 1) )
        .toThrow(TypeError)
    })
  })

  const BAYER_CURRENT_VALUE = 18
  const APPLE_CURRENT_VALUE = 348

  describe('a portfolio is worth', () => {
    it('nothing when empty', () => {
      expect(Portfolio.value(portfolio)).toEqual(0)
    })

    it('share price on single-share purchase', () => {
      const stockLookupFunction = _symbol => BAYER_CURRENT_VALUE

      let updatedPortfolio = Portfolio.purchase(portfolio, BAYER, 1)

      expect(Portfolio.value(updatedPortfolio, stockLookupFunction)).toEqual(BAYER_CURRENT_VALUE)
    })

    it('share price on two-share purchase', () => {
        const stockLookupFunction = _symbol => BAYER_CURRENT_VALUE
  
        let updatedPortfolio = Portfolio.purchase(portfolio, BAYER, 2)
  
        expect(Portfolio.value(updatedPortfolio, stockLookupFunction)).toEqual(BAYER_CURRENT_VALUE*2)
    })

    it('share price on multiple holdings', () => {
      const stockLookupFunction = _symbol => _symbol === "BAYN" ? BAYER_CURRENT_VALUE : APPLE_CURRENT_VALUE
      let updatedPortfolio = Portfolio.purchase(portfolio, BAYER, 1)
      updatedPortfolio = Portfolio.purchase(portfolio, APPLE, 1)

    })
  })
})