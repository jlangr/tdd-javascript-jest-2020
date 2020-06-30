// this will likely prove useful and you won't
// have to find it on StackOverflow:
//const numberOfCharactersInString = (s, char) =>
//  (s.match(new RegExp(char, 'g'))||[]).length;

const parts = name => name.split(' ')

const last = name => parts(name)[1]

const first = name => parts(name)[0]

const isMononym = name => parts(name).length === 1

export const normalize = name => {
  const trimmed = name.trim()
  if (isMononym(trimmed)) return trimmed
  return `${last(trimmed)}, ${first(trimmed)}`
}
