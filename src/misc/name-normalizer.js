// this will likeley prove useful and you won't
// have to find it on StackOverflow:
//const numberOfCharactersInString = (s, char) =>
//  (s.match(new RegExp(char, 'g'))||[]).length;

const parts = name => name.split(' ')

const isMononym = name => parts(name).length === 1

const makeMiddles = names => names.map(name => name.length === 1 ? name : `${name[0]}`)

const removeWhitespace = name => name.trim()

export const normalize = name => {
  if (isMononym(name)) return name
  const trimmedName = removeWhitespace(name)
  const nameParts = parts(trimmedName)
  const firstName = nameParts.shift()
  const lastName = nameParts.pop()
  return [`${lastName},`, firstName, ...makeMiddles(nameParts)].join(' ')
}
