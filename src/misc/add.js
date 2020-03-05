export default class EventStuff {
  constructor() {
    this.holder = []
  }

  saveEvent(a) {
    const found = this.holder.filter(event => event.type === a.type)
    if (found.length === 0)
      this.holder.push(a)
    else
      found.forEach(e => { e.option = a.option })
  }



  saveEventOld(a) {
    let app = true
    if (this.holder.length) {
      this.holder.forEach((ap) => {
        if (a.type === ap.type) {
          ap.type = a.type
          ap.option = a.option
          app = false
        }
      })
      if (app) {
        this.holder.push(a)
      }
    } else {
      this.holder.push(a)
    }
  }
}
