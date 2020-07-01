export const createPortfolio = () => new Map()
export const uniqueSymbolCount = portfolio => portfolio.size
export const symbolShareCount = (portfolio, symbolName) => portfolio.get(symbolName) || 0
export const isEmpty = portfolio => uniqueSymbolCount(portfolio) === 0
export const purchase = (portfolio, symbolName, symbolShares) => {
  portfolio.set(symbolName, symbolShareCount(portfolio, symbolName) + symbolShares)
  return portfolio
}