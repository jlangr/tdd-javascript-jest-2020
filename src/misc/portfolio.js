export const uniqueSymbolCount = portfolio => Object.keys(portfolio).length

export const createPortfolio = () => ({})

export const isEmpty = portfolio => uniqueSymbolCount(portfolio) === 0

const getCurrentPositionForSymbol = (portfolio, symbol) => portfolio[symbol] ? portfolio[symbol].quantity : 0

export const purchase = (portfolio, symbol, quantity) => {
  if (quantity < 1) {
    throw new RangeError("Invalid quantity " + quantity)
  }
  if (portfolio[symbol]) {
    let newQuantity = getCurrentPositionForSymbol(portfolio, symbol) + quantity
    return { ...portfolio, [symbol]: { quantity: newQuantity } }
  } else {
    return { ...portfolio, [symbol]: { quantity } }
  }
}

const validateSale = (portfolio, symbol, quantity) => {
  let remainingQuantity = getCurrentPositionForSymbol(portfolio, symbol) - quantity
  if (remainingQuantity < 0) throw new Error("Selling more shares than available")
  return remainingQuantity
}

export const sell = (portfolio, symbol, quantity) => {
  const remainingQuantity = validateSale(portfolio, symbol, quantity)
  if (remainingQuantity === 0) {
    delete portfolio[symbol]
    return { ...portfolio}
  } else {
    return { ...portfolio, [symbol]: { quantity: remainingQuantity } }
  }
}

export const countShares = (portfolio, symbol) => (portfolio[symbol]) ? portfolio[symbol].quantity : 0
