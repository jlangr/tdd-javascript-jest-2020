const memberDiscountPct = checkout => checkout.member ? checkout.discount : 0

const shouldApplyDiscount = (checkout, item) => !item.exempt && memberDiscountPct(checkout) > 0

let calculateDiscountedPrice = function (checkout, item) {
  return item.price * (1.0 - memberDiscountPct(checkout))
}

export const calculateTotal = checkout => {
  let total = 0
  checkout.items.forEach(item => {
    if (shouldApplyDiscount(checkout, item))
      total += calculateDiscountedPrice(checkout, item)
    else
      total += item.price
  })
  return total
}

export const calculateTotalSaved = checkout => {
  let totalSaved = 0
  checkout.items.forEach(item => {
    if (shouldApplyDiscount(checkout, item))
      totalSaved += memberDiscountPct(checkout) * item.price
  })
  return totalSaved
}

export const calculateTotalOfDiscountedItems = checkout =>
  checkout.items
    .filter(item => shouldApplyDiscount(checkout, item))
    .reduce((total, item) => total + calculateDiscountedPrice(checkout, item), 0)
