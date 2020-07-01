export const uniqueSymbolCount = portfolio => Object.keys(portfolio).length

export const createPortfolio = () => ({})

export const isEmpty = portfolio => uniqueSymbolCount(portfolio) === 0

export const purchase = (portfolio, symbol, quantity) => {
  if (quantity < 1) {
    throw new RangeError("Invalid quantity " + quantity)
  }
  if (portfolio[symbol]) {
    let newQuantity = portfolio[symbol].quantity + quantity
    return { ...portfolio, [symbol]: { quantity: newQuantity } }
  } else {
    return { ...portfolio, [symbol]: { quantity } }
  }
}

export const sell = (portfolio, symbol, quantity) => {
  let newQuantity = portfolio[symbol].quantity - quantity
  return { ...portfolio, [symbol]: { quantity: newQuantity } }
}

export const countShares = (portfolio, symbol) => (portfolio[symbol]) ? portfolio[symbol].quantity : 0
