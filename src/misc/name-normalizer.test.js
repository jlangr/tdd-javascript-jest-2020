import { normalize } from './name-normalizer'

xdescribe('a name normalizer', () => {
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

  //initializes middle name
  //shannon marie griffin => griffin, shannon m.
  it('initializes middle name', () => {
    expect(normalize('Shannon Marie Griffin')).toEqual('Griffin, Shannon M.')
  })

  //does not intialize one-letter middle name
  //Harry S Truman => Truman, Harry S
  it('does not intialize one-letter middle name', () => {
    expect(normalize('Harry S Truman')).toEqual('Truman, Harry S')
  })

  //has multiple middle names
  //Julia Scarlett Elizabeth Dreyfus => Dreyfus, Julia S. E.
  it('has multiple middle names', () => {
    expect(normalize('Julia Scarlett Elizabeth Dreyfus')).toEqual('Dreyfus, Julia S. E.')
  })

  //has suffix
  // Martin Luther King, Jr. => King, Martin L., Jr
  it('has suffix', () => {
    expect(normalize('Martin Luther King, Jr.')).toEqual('King, Martin L., Jr')
  })
})

