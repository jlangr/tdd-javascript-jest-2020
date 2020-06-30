// this will likeley prove useful and you won't
// have to find it on StackOverflow:
//const numberOfCharactersInString = (s, char) =>
//  (s.match(new RegExp(char, 'g'))||[]).length;

const parts = name => name.split(' ')

cconst isMononym = name => parts(name).length === 1

const removeWhitespace = name => name.trim()

export const normalize = name => {
  if (isMononym(name)) return name
  const trimmedName = removeWhitespace(name)
  const [firstName, second, third] = parts(trimmedName)
  if(third) {
    const middleName = second.length === 1 ? second : `${second[0]}.`
    return `${third}, ${firstName} ${middleName}`
  }
  return `${second}, ${firstName}`
}
