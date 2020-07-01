export const uniqueSymbolCount = portfolio => {
    return Object.keys(portfolio).length
}

export const createPortfolio = () => ({})

export const isEmpty = portfolio => uniqueSymbolCount(portfolio) === 0

export const purchase = (portfolio, token) => {
    return { ...portfolio,
        [token]: 1
    }
}

export const getShares = (portfolio, token) => {
    return portfolio[token] || 0
}
