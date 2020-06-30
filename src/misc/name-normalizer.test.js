import { normalize } from './name-normalizer'

describe('a name normalizer', () => {
  it('returns empty when passed empty string', () => {
    expect(normalize('')).toEqual('')
  })

  it('returns single word name', () => {
    expect(normalize('Plato')).toEqual('Plato')
  })

  it('swaps first and last names', () => {
    expect(normalize('Haruki Murakami')).toEqual('Murakami, Haruki')
  })

  it('trims leading and trailing whitespace', () => {
    expect(normalize('  Big Boi   ')).toEqual('Boi, Big')
  })

  it('initializes middle name', () => {
    expect(normalize("Alpha Beta Gamma")).toEqual("Gamma, Alpha B.")
  })

  it('no period middle name', () => {
    expect(normalize("Harry S Truman")).toEqual("Truman, Harry S")
  })

  it('multiple middle names', () => {
    expect(normalize("Alpha Beta Gamma Delta")).toEqual("Delta, Alpha B. G.")
  })
})
