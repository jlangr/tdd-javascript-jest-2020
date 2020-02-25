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

  it('adds middle name as initial', () => {
    expect(normalize('Franklin Delano Roosevelt'))
      .toEqual('Roosevelt, Franklin D.')
  })

  it('does not initialize a single-letter middle name', () => {
    expect(normalize('Harry S Truman'))
      .toEqual('Truman, Harry S')
  })

  it('initializes multiple middle names', () => {
    expect(normalize('John Henry Marie Schmidt'))
      .toEqual('Schmidt, John H. M.')
  })

  it('appends suffixes', () => {
    expect(normalize('Lloyd Martin Christmas, Jr.'))
      .toEqual('Christmas, Lloyd M., Jr.')
  })
})
