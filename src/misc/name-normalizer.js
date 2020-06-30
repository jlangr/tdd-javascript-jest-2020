// this will likeley prove useful and you won't
// have to find it on StackOverflow:
//const numberOfCharactersInString = (s, char) =>
//  (s.match(new RegExp(char, 'g'))||[]).length;

const parts = name => name.split(' ')

const isMononym = name => parts(name).length === 1

const removeWhitespace = name => name.trim()

export const normalize = name => {
  if (isMononym(name)) return name
  const trimmedName = removeWhitespace(name)
  const nameParts = parts(trimmedName)
  const firstName = nameParts.shift()
  const lastName = nameParts.pop()
  const middleName = nameParts.map(m => m.length === 1 ? m: `${m[0]}.`)
  return [lastName + ',', firstName, ...middleName].join(' ')
}
