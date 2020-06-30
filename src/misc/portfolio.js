export const createPortfolio = () => new Map()
export const uniqueSymbolCount = portfolio => portfolio.size
export const isEmpty = portfolio => uniqueSymbolCount(portfolio) === 0
export const purchase = (portfolio, symbolName) => {
  portfolio.set(symbolName, 1)
  return portfolio
}