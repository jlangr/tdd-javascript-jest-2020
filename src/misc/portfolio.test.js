import * as Portfolio from './portfolio'
import {createPortfolio} from './portfolio'

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

    it('count is empty when no purchases made', () => {
      expect(Portfolio.uniqueSymbolCount(portfolio)).toEqual(0)
    })

    it('count is 1 when purchased a single symbol', () => {
      const updatedPortfolio = Portfolio.purchase(portfolio)

      expect(Portfolio.uniqueSymbolCount(updatedPortfolio)).toEqual(1)
    })

    it('count increments when purchasing multiple symbols', () => {
      let updatedPortfolio = Portfolio.purchase(portfolio, 'BAYN')
      updatedPortfolio = Portfolio.purchase(updatedPortfolio, 'AAPL')

      expect(Portfolio.uniqueSymbolCount(updatedPortfolio)).toEqual(2)
    })
  })

  it('count does not increment when purchasing same symbol as already purchased', () => {
    let updatedPortfolio = Portfolio.purchase(portfolio, 'BAYN')
    updatedPortfolio = Portfolio.purchase(updatedPortfolio, 'BAYN')

    expect(Portfolio.uniqueSymbolCount(updatedPortfolio)).toEqual(1)
  })

  it('count shares', () => {
    let updatedPortfolio = Portfolio.purchase(portfolio, 'BAYN', 2)
    updatedPortfolio = Portfolio.purchase(updatedPortfolio, 'BAYN', 2)

    expect(Portfolio.countShares(updatedPortfolio, "BAYN")).toEqual(4)
  })

  it('should throw RangeError when attempting to purchase non-positive shares', function () {
    expect(() => Portfolio.purchase(portfolio, "BAYN", -1)).toThrow();
  });

  // decrease shares when sold
  it('decrease quantity when shares are sold', () => {
    let updatedPortfolio = Portfolio.purchase(portfolio, 'BAYN', 2)
    updatedPortfolio = Portfolio.sell(updatedPortfolio, 'BAYN', 1)

    expect(Portfolio.countShares(updatedPortfolio, "BAYN")).toEqual(1)
  });

  // throw error when selling more shares than available
  it('should ', () => {
    
  });

  // decrease unique symbol count when all shares of a symbol are sold
})