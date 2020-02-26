import { pad } from '../../util/stringutil'
import { calculateTotal, calculateTotalOfDiscountedItems, calculateTotalSaved } from './checkout-model'

const LineWidth = 45
const Indent = `   `

export const round2 = amount => Math.round(amount * 100) / 100

const formatAmount = amount => parseFloat(round2(amount)).toFixed(2)

const shouldApplyDiscount = (checkout, item) => !item.exempt && memberDiscountPct(checkout) > 0

const calculateDiscountAmount = (checkout, item) => memberDiscountPct(checkout) * item.price

const memberDiscountPct = checkout => checkout.member ? checkout.discount : 0

const lineItem = (text, lineAmount) => {
  const amount = formatAmount(lineAmount)
  const amountWidth = amount.length
  const textWidth = LineWidth - amountWidth
  return pad(text, textWidth) + amount
}

export const createReceiptMessages = (checkout, totals) => {
  const messages = []
  checkout.items.forEach(item => {
    messages.push(lineItem(item.description, item.price))
    if (shouldApplyDiscount(checkout, item)) {
      messages.push(lineItem(
        `${Indent}${memberDiscountPct(checkout) * 100}% mbr disc`,
        -calculateDiscountAmount(checkout, item)))
    }
  })
  messages.push(lineItem('TOTAL', round2(totals.total)))
  if (totals.totalSaved > 0)
    messages.push(lineItem('*** You saved:', totals.totalSaved))
  return messages
}

export const createReceipt = checkout => {
  const totals = ({
    total: calculateTotal(checkout),
    totalSaved: calculateTotalSaved(checkout),
    totalOfDiscountedItems: calculateTotalOfDiscountedItems(checkout)
  })
  return {
    totals,
    messages: createReceiptMessages(checkout, totals)
  }
}
