const conversions = [
  { arabicDigit: 100, romanDigit: 'C' },
  { arabicDigit: 10, romanDigit: 'X' },
  { arabicDigit: 1, romanDigit: 'I' }
]

const convert = arabic => {
  const appendRomanDigits = (s, { arabicDigit, romanDigit }) => {
    const numberOfRomanDigits = Math.floor(arabic / arabicDigit)
    arabic -= numberOfRomanDigits * arabicDigit
    return s + romanDigit.repeat(numberOfRomanDigits)
  }
  return conversions.reduce(appendRomanDigits, '')
}

describe('cvt', () => {
  it('cvts', () => {
    expect(convert(1)).toEqual('I')
    expect(convert(2)).toEqual('II')
    expect(convert(3)).toEqual('III')
    expect(convert(10)).toEqual('X')
    expect(convert(11)).toEqual('XI')
    expect(convert(20)).toEqual('XX')
    expect(convert(300)).toEqual('CCC')
  })
})