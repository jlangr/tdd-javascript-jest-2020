import * as Members from '../data/member_database'
import {retrieveItem} from '../data/item_database'
import * as Checkouts from '../data/checkouts'
import {pad} from '../../util/stringutil'

const sendRequestError = (response, message) => {
  response.status = 400
  response.send({error: message})
}

const sendResponse = (response, body, status = 200) => {
  response.status = status
  response.send(body)
}

export const clearAllCheckouts = (_, __) => Checkouts.deleteAll()

export const getCheckout = (request, response) =>
  response.send(Checkouts.retrieve(request.params.id))

export const getCheckouts = (_, response) =>
  response.send(Checkouts.retrieveAll())

export const postCheckout = (_, response) =>
  sendResponse(response, Checkouts.createNew(), 201)

export const getItems = (request, response) => {
  const checkout = Checkouts.retrieve(request.params.id)
  response.send(checkout.items)
}

const attachMemberToCheckout = (checkoutId, memberId) => {
  const member = Members.retrieveMember(memberId)
  if (!member) return 'unrecognized member'

  const checkout = Checkouts.retrieve(checkoutId)
  if (!checkout) return 'invalid checkout'

  Object.assign(checkout, member)

  Checkouts.updateCheckout(checkoutId, checkout)
}

export const postMember = (request, response) => {
  const memberId = request.body.id
  const checkoutId = request.params.id
  const errorMessage = attachMemberToCheckout(checkoutId, memberId)
  if (errorMessage)
    return sendRequestError(response, errorMessage)

  sendResponse(response, Checkouts.retrieve(checkoutId))
}

export const postItem = (request, response) => {
  const itemDetails = retrieveItem(request.body.upc)
  if (!itemDetails)
    return sendRequestError(response, 'unrecognized UPC code')

  const checkout = Checkouts.retrieve(request.params.id)
  if (!checkout)
    return sendRequestError(response, 'nonexistent checkout')

  const newCheckoutItem = Checkouts.addItem(checkout, itemDetails)

  sendResponse(response, newCheckoutItem, 201)
}

const LineWidth = 45

export const postCheckoutTotal = (request, response) => {
  const checkoutId = request.params.id
  const checkout = Checkouts.retrieve(checkoutId)
  if (!checkout) {
    response.status = 400
    response.send({error: 'nonexistent checkout'})
    return
  }

  const messages = []
  const discount = checkout.member ? checkout.discount : 0

  const {totalOfDiscountedItems, total, totalSaved} = calculateLineItems(checkout, discount, messages)

  // append total line
  addFormatMessage(total, messages, "TOTAL")
  
  if (totalSaved > 0) {
    addFormatMessage(totalSaved, messages, "*** You saved:")
  }

  response.status = 200
  // send total saved instead
  response.send({ id: checkoutId, total, totalOfDiscountedItems, messages, totalSaved })
}

function roundToCurrencyPrecision(total) {
  return Math.round(total * 100) / 100;
}

function calculateDiscountedItem(discount, price, totalOfDiscountedItems, item, messages, total, totalSaved) {
  const discountAmount = discount * price
  const discountedPrice = price * (1.0 - discount)

  // add into total
  totalOfDiscountedItems += discountedPrice

  let text = item.description
  // format percent
  const amount = checkoutAmountParser(price)

  let textWidth = calculateTextWidth(amount.length)
  messages.push(pad(text, textWidth) + amount)

  total += discountedPrice

  // discount line
  const discountFormatted = '-' + checkoutAmountParser(discountAmount)
  textWidth = calculateTextWidth(discountFormatted.length)
  text = `   ${discount * 100}% mbr disc`
  messages.push(`${pad(text, textWidth)}${discountFormatted}`)

  totalSaved += discountAmount
  return {totalOfDiscountedItems, total, totalSaved};
}

const ZERO = 0

function calculateLineItems(checkout, discount, messages) {
  let totalOfDiscountedItems = ZERO
  let total = ZERO
  let totalSaved = ZERO
  checkout.items.forEach(item => {
    let price = item.price
    const isExempt = item.exempt
    if (!isExempt && discount > ZERO) {
      const discountedCalculationResult = calculateDiscountedItem(discount, price, totalOfDiscountedItems, item, messages, total, totalSaved);
      totalOfDiscountedItems = discountedCalculationResult.totalOfDiscountedItems;
      total = discountedCalculationResult.total;
      totalSaved = discountedCalculationResult.totalSaved;
    }
    else {
      total += price
      const text = item.description
      const amount = checkoutAmountParser(price)

      const textWidth = calculateTextWidth(amount.length)
      messages.push(pad(text, textWidth) + amount)
    }
  })
  total = roundToCurrencyPrecision(total)
  totalOfDiscountedItems = roundToCurrencyPrecision(totalOfDiscountedItems)
  totalSaved = roundToCurrencyPrecision(totalSaved)
  return { totalOfDiscountedItems, total, totalSaved }
}

function calculateTextWidth(amountWidth) {
  return LineWidth - amountWidth
}

function addFormatMessage(total, messages, txt) {
  const formattedTotal = checkoutAmountParser(total)
  const textWidth = calculateTextWidth(formattedTotal.length)
  messages.push(pad(txt, textWidth) + formattedTotal)
}

function checkoutAmountParser(price) {
  return parseFloat(roundToCurrencyPrecision(price).toString()).toFixed(2)
}

