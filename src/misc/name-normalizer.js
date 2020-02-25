// this will likeley prove useful and you won't
// have to find it on StackOverflow:
//const numberOfCharactersInString = (s, char) =>
//  (s.match(new RegExp(char, 'g'))||[]).length;

const last = nameParse => nameParse.nameParts[nameParse.nameParts.length - 1]

const first = nameParse => nameParse.nameParts[0]

const middleNames = nameParse => nameParse.nameParts.slice(1, -1)

const initial = namePart =>
  namePart.length === 1 ? namePart : `${namePart[0]}.`

const middleInitials = nameParse =>
  middleNames(nameParse).map(initial).join(' ')


const isDuonym = nameParse => nameParse.nameParts.length === 2

const isMononym = nameParse => nameParse.nameParts.length === 1


const formatMononym = nameParse => nameParse.name

const formatDuonym = nameParse => `${last(nameParse)}, ${first(nameParse)}`

const optionalSuffix = nameParse => nameParse.suffix ? `, ${nameParse.suffix}` : ''

const formatWesternStandardName = nameParse =>
  `${last(nameParse)}, ${first(nameParse)} ${middleInitials(nameParse)}${optionalSuffix(nameParse)}`


const parseName = fullName => {
  const name = fullName.trim()
  const [baseName, suffix] = name.split(', ')
  return {
    name,
    nameParts: baseName.split(' '),
    suffix
  }
}

export const normalize = fullName => {
  const nameParse = parseName(fullName)
  if (isMononym(nameParse)) return formatMononym(nameParse)
  if (isDuonym(nameParse)) return formatDuonym(nameParse)
  return formatWesternStandardName(nameParse)
}
