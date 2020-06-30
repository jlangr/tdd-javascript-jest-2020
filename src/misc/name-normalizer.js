// this will likely prove useful and you won't
// have to find it on StackOverflow:
//const numberOfCharactersInString = (s, char) =>
//  (s.match(new RegExp(char, 'g'))||[]).length;


const parts = name => name.split(' ')

const last = name => parts(name)[parts(name).length - 1]

const first = name => parts(name)[0]

const isMononym = name => parts(name).length === 1

const hasMiddleName = name => parts(name).length === 3

const middleInitial = name => {
  const middleName = parts(name)[parts(name).length - 2];
  return (middleName.length === 1)
      ? middleName
      : middleName.slice(0, 1) + "."
}

export const normalize = name => {
  const trimmed = name.trim()
  if (isMononym(trimmed)) return trimmed
  if (hasMiddleName(trimmed)) {
    return `${last(trimmed)}, ${first(trimmed)} ${middleInitial(trimmed)}`
  }
  return `${last(trimmed)}, ${first(trimmed)}`
}
