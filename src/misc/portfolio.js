export const uniqueSymbolCount = portfolio =>
    portfolio.uniqueSymbolCount

export const createPortfolio = () => ({ uniqueSymbolCount: 0 })

export const isEmpty = portfolio => portfolio.uniqueSymbolCount === 0

export const purchase = portfolio => {
    return { ...portfolio,
        uniqueSymbolCount: portfolio.uniqueSymbolCount + 1 }
}
