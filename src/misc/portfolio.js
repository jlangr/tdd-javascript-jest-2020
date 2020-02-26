export const value = (portfolio, service) =>
  Object.entries(portfolio.holdings).reduce(
    (total, [symbol, shares]) => total + service(symbol) * shares
    , 0)

export const create = () => ({
  holdings: {}
})

const throwOnNonPositiveShares = shares => {
  if (shares <= 0) throw new RangeError()
}

export const purchase = (portfolio, symbol, shares) => {
  throwOnNonPositiveShares(shares)
  return { ...portfolio,
    holdings: { ...portfolio.holdings, [symbol]: sharesOf(portfolio, symbol) + shares } }
}

export const sharesOf = (portfolio, symbol) =>
  !(symbol in portfolio.holdings)
    ? 0
    : portfolio.holdings[symbol]

export const isEmpty = portfolio => symbolCount(portfolio) === 0

export const symbolCount = portfolio =>
  Object.keys(portfolio.holdings).length