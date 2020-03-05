import EventStuff from './add'

describe('#saveEvent', () => {
  let stuff

  beforeEach(() => stuff = new EventStuff())

  it('adds event when holder empty', () => {
    stuff.saveEvent({ type: 1, option: 'a' })

    expect(stuff.holder).toEqual([{ type: 1, option: 'a' }])
  })

  it('adds event when no matching type found', () => {
    stuff.holder = [{ type: 1, option: 'a' }]

    stuff.saveEvent({ type: 2, option: 'b' })

    expect(stuff.holder).toEqual(
      [{ type: 1, option: 'a' },
        { type: 2, option: 'b' }])
  })

  it('updates event when matching type found', () => {
    stuff.holder = [{ type: 1, option: 'a' }]

    stuff.saveEvent({ type: 1, option: 'aDelta' })

    expect(stuff.holder).toEqual([{ type: 1, option: 'aDelta' }])
  })








  
  it('updates *all* events for matching type', () => {
    stuff.holder = [
      { type: 1, option: '1blah' },
      { type: 2, option: 'a' },
      { type: 1, option: '1blue' },
    ]

    stuff.saveEvent({ type: 1, option: 'aDelta' })

    expect(stuff.holder).toEqual([
      { type: 1, option: 'aDelta' },
      { type: 2, option: 'a' },
      { type: 1, option: 'aDelta' },
    ])
  })
})

