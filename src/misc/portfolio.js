export const uniqueSymbolCount = portfolio => Object.keys(portfolio).length

export const createPortfolio = () => ({})

export const isEmpty = portfolio => uniqueSymbolCount(portfolio) === 0

export const purchase = (portfolio, symbol, quantity = 1) => {
  if (portfolio[symbol]) {
    let newQuantity = portfolio[symbol].quantity + quantity
    return { ...portfolio, [symbol]: { quantity: newQuantity, purchaseDate: Date.now() } }
  } else {
    return { ...portfolio, [symbol]: { quantity, purchaseDate: Date.now() } }
  }
}

export const countShares = (portfolio, symbol) => (portfolio[symbol]) ? portfolio[symbol].quantity : 0


// {
//   BAYN: {
//       purchaseDate: "",
//       quantity: ""
//     }
// }