import * as NASDAQ from './NASDAQ'

export const uniqueSymbolCount = portfolio => Object.keys(portfolio.holdings).length

export const createPortfolio = () => ({ holdings: {} })

export const isEmpty = portfolio => uniqueSymbolCount(portfolio) === 0

const transact = (portfolio, symbol, shares) => ({
  ...portfolio, holdings: { ...portfolio.holdings,
    [symbol]: sharesOf(portfolio, symbol) + shares
  }
})

export const purchase = (portfolio, symbol, shares) => transact(portfolio, symbol, shares)

const removeIfEmpty = (portfolio, symbol) => {
  if (sharesOf(portfolio, symbol) === 0)
    delete portfolio.holdings[symbol]
  return portfolio
}

const throwWhenSellingTooMany = (portfolio, symbol, shares) => {
  if (sharesOf(portfolio, symbol) < shares)
    throw new TypeError()
}

export const sell = (portfolio, symbol, shares) => {
  throwWhenSellingTooMany(portfolio, symbol, shares)
  let updatedPortfolio = transact(portfolio, symbol, -shares)
  return removeIfEmpty(updatedPortfolio, symbol)
}

export const sharesOf = (portfolio, symbol) =>
  !(symbol in portfolio.holdings) ? 0 : portfolio.holdings[symbol]

export const value = (portfolio, stockService=NASDAQ.price) =>
  Object.keys(portfolio.holdings)
    .reduce((total, symbol) =>
      total + stockService(symbol) * sharesOf(portfolio, symbol),
        0)
