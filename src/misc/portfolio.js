export const uniqueSymbolCount = portfolio => Object.keys(portfolio).length

export const createPortfolio = () => ({ })

export const isEmpty = portfolio => uniqueSymbolCount(portfolio) === 0

export const purchase = (portfolio, symbol) => {
  return { ...portfolio, [symbol]: { } }
}
