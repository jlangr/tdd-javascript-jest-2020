// this will likely prove useful and you won't
// have to find it on StackOverflow:
//const numberOfCharactersInString = (s, char) =>
//  (s.match(new RegExp(char, 'g'))||[]).length;


const parts = name => name.split(' ')

const last = nameArray => nameArray[nameArray.length - 1]

const first = nameArray => nameArray[0]

const isMononym = nameArray => nameArray.length === 1

const hasMiddleName = nameArray => nameArray.length > 2

const reducer = (accumulator, currentValue, index) => {
  const result = currentValue.length === 1
  ? currentValue
      : currentValue.slice(0, 1) + "."

  return "" + accumulator + result
}

const middleInitial = nameArray => {
  const middleNames = nameArray.slice(1, nameArray.length -1)
  // return middleNames.reduce(reducer)
  const initialified = middleNames.reduce(reducer, "")
  console.log('***********************')
  console.log(nameArray)
  console.log(initialified)
  return initialified
}

export const normalize = name => {
  const nameArray = parts(name.trim())

  if (isMononym(nameArray)) return nameArray[0]
  if (hasMiddleName(nameArray)) {
    return `${last(nameArray)}, ${first(nameArray)} ${middleInitial(nameArray)}`
  }
  return `${last(nameArray)}, ${first(nameArray)}`
}
