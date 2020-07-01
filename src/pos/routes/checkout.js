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

const discountAmount = (discount, price) => discount * price

const discountedPrice = (discount, price) => price * (1.0 - discount)

const parseAmount = (price) => parseFloat((Math.round(price * 100) / 100).toString()).toFixed(2)
const textWidth = (width)=> LineWidth - width

const itemTotal = (item, {totalOfDiscountedItems, total, totalSaved, discount, messages} ) => {
  let price = item.price
  const isExempt = item.exempt
  if (!isExempt && discount > 0) {
    
    // add into total
    totalOfDiscountedItems += discountedPrice(discount, price)

    let text = item.description
    // format percent
    messages.push(pad(text, textWidth(amount.length)) + amount)

    total += discountedPrice

    // discount line
    const discountFormatted = '-' + parseAmount(discountAmount(discount, price))
    text = `   ${discount * 100}% mbr disc`
    messages.push(`${pad(text, textWidth(discountFormatted.length))}${discountFormatted}`)

    totalSaved += discountAmount(discount, price)

  }
  else {
    total += price
    const text = item.description
    const amount = parseAmount(price )
    messages.push(pad(text, textWidth(amount.length)) + amount)
  }
  return {totalOfDiscountedItems, total, totalSaved, discount, messages}
}

function formatMessage(formattedTotal, messages) {
  console.log(`formattedTotal: ${formattedTotal}`)
  const formattedTotalWidth = formattedTotal.length
  messages.push(pad('*** You saved:', textWidth(formattedTotalWidth)) + formattedTotal)
}

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

  let totalOfDiscountedItems = 0
  let total = 0
  let totalSaved = 0

  checkout.items.forEach(item => {
    // {totalOfDiscountedItems, total, totalSaved, discount, messages} = itemTotal(item, {totalOfDiscountedItems, total, totalSaved, discount, messages})
    const obj = itemTotal(item, {totalOfDiscountedItems, total, totalSaved, discount, messages})
    totalOfDiscountedItems = obj.totalOfDiscountedItems
    total = obj.total
    totalSaved = obj.totalSaved
  })

  total = Math.round(total * 100) / 100

  // append total line
  const formattedTotal = parseFloat((Math.round(total * 100) / 100).toString()).toFixed(2)
  const formattedTotalWidth = formattedTotal.length
  messages.push(pad('TOTAL', textWidth(formattedTotalWidth)) + formattedTotal)

  if (totalSaved > 0) {
    const formattedTotal = parseFloat((Math.round(totalSaved * 100) / 100).toString()).toFixed(2)
    formatMessage(formattedTotal, messages);
  }

  totalOfDiscountedItems = Math.round(totalOfDiscountedItems * 100) / 100

  totalSaved = Math.round(totalSaved * 100) / 100

  response.status = 200
  // send total saved instead
  response.send({ id: checkoutId, total, totalOfDiscountedItems, messages, totalSaved })
}
