import * as Portfolio from './portfolio'
import { when } from 'jest-when'

const BayerCurrentValue = 19
const IbmCurrentValue = 100

describe('a portfolio', () => {
  let portfolio
  beforeEach(() => portfolio = Portfolio.create())

  it('returns empty when created', () => {
    expect(Portfolio.isEmpty(portfolio)).toBe(true)
  })

  it('is no longer empty after purchase', () => {
    const newPortfolio = Portfolio.purchase(portfolio)

    expect(Portfolio.isEmpty(newPortfolio)).toBe(false)
  })

  it('has symbol count 0 when created', () => {
    expect(Portfolio.symbolCount(portfolio)).toBe(0)
  })

  it('sets symbol count after purchase', () => {
    const newPortfolio = Portfolio.purchase(portfolio)

    expect(Portfolio.symbolCount(newPortfolio)).toBe(1)
  })

  it('increments symbol count each unique symbol purchase', () => {
    let newPortfolio = Portfolio.purchase(portfolio, 'IBM')
    newPortfolio = Portfolio.purchase(newPortfolio, 'BAYN')

    expect(Portfolio.symbolCount(newPortfolio)).toBe(2)
  })

  it('does not increment symbol count for same symbol purchase', () => {
    let newPortfolio = Portfolio.purchase(portfolio, 'IBM')
    newPortfolio = Portfolio.purchase(newPortfolio, 'IBM')

    expect(Portfolio.symbolCount(newPortfolio)).toBe(1)
  })

  it('returns shares for purchased symbol', () => {
    const newPortfolio = Portfolio.purchase(portfolio, 'IBM', 17)

    expect(Portfolio.sharesOf(newPortfolio, 'IBM')).toBe(17)
  })

  it('returns shares for appropriate symbol', () => {
    let newPortfolio = Portfolio.purchase(portfolio, 'IBM', 17)
    newPortfolio = Portfolio.purchase(newPortfolio, 'AAPL', 42)

    expect(Portfolio.sharesOf(newPortfolio, 'IBM')).toBe(17)
    expect(Portfolio.sharesOf(newPortfolio, 'AAPL')).toBe(42)
  })

  it('returns 0 for shares of symbol not purchased', () => {
    expect(Portfolio.sharesOf(portfolio, 'BAYN')).toBe(0)
  })

  it('accumulates shares for multiple purchases same symbol', () => {
    let newPortfolio = Portfolio.purchase(portfolio, 'IBM', 17)
    newPortfolio = Portfolio.purchase(newPortfolio, 'IBM', 42)

    expect(Portfolio.sharesOf(newPortfolio, 'IBM')).toBe(59)
  })

  it('throws on purchase of non-positive shares', () => {
    expect(() => Portfolio.purchase(portfolio, 'IBM', -1)).toThrow(RangeError)
  })

  describe('my net worth', () => {
    it('is nothing when portfolio is empty', () => {
      expect(Portfolio.value(portfolio)).toBe(0)
    })

    it('is share price with single-share purchase', () => {
      const stubStockService = _symbol => BayerCurrentValue
      const newPortfolio = Portfolio.purchase(portfolio, 'BAYN', 1)

      const value = Portfolio.value(newPortfolio, stubStockService)

      expect(value).toBe(BayerCurrentValue)
    })

    it('multiplies share price by # shares', () => {
      const stubStockService = _symbol => BayerCurrentValue
      const newPortfolio = Portfolio.purchase(portfolio, 'BAYN', 10)

      const value = Portfolio.value(newPortfolio, stubStockService)

      expect(value).toBe(BayerCurrentValue * 10)
    })

    it('accumulates symbol values', () => {
      const stubStockService = jest.fn()
      when(stubStockService).calledWith('BAYN').mockReturnValue(BayerCurrentValue)
      when(stubStockService).calledWith('IBM').mockReturnValue(IbmCurrentValue)
      let newPortfolio = Portfolio.purchase(portfolio, 'BAYN', 10)
      newPortfolio = Portfolio.purchase(newPortfolio, 'IBM', 20)

      const value = Portfolio.value(newPortfolio, stubStockService)

      expect(value).toBe(BayerCurrentValue * 10 +
                        IbmCurrentValue * 20)
    })
  })
})