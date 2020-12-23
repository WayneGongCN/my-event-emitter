class EventEmitter {
  constructor() {
    this._events = {}
  }


  addListener(type, listener) {
    if (!type || typeof type !== 'string' || typeof listener !== 'function') throw new Error(`Type or Listener error.`)

    if (this._hasEventType(type)) {
      this._events[type].push(listener)
    } else {
      this._events[type] = [listener]
    }
  }


  emit(type, ...args) {
    if (this._hasEventType(type)) {
      const listeners = this._events[type]
      try {
        listeners.forEach(listener => listener(...args))
      } catch (e) {
        throw e
      }
    } else {
      throw new Error(`Event ${type} not found.`)
    }
  }

  removeListener(type, listener) {
    if (this._hasEventType(type)) {
      const listeners = this._events[type]
      const listenerIdx = listeners.findIndex(x => x === listener)
      if (listenerIdx !== -1) {
        listeners.splice(listenerIdx, 1)
      } else {
        throw new Error(`Listener ${type} not found.`)
      }
    } else {
      throw new Error(`Event ${type} not found.`)
    }
  }


  _hasEventType(type) {
    return Array.isArray(this._events[type])
  }
}




const eventEmitter = new EventEmitter()

function test1(...args) {
  console.log('Event test1: ', ...args)
}
function test2(...args) {
  console.log('Event test2: ', ...args)
}
function test3(...args) {
  console.log('Event test3: ', ...args)
}

eventEmitter.addListener('test', test1)
eventEmitter.addListener('test', test2)
eventEmitter.addListener('test', test3)


eventEmitter.emit('test', 1, 2, 3, 4, 5)

eventEmitter.removeListener('test', test1)
eventEmitter.emit('test', 1, 2, 3, 4, 5)

eventEmitter.removeListener('test', test2)
eventEmitter.emit('test', 1, 2, 3, 4, 5)

eventEmitter.removeListener('test', test3)
eventEmitter.emit('test', 1, 2, 3, 4, 5)

// 1
// 2
// 3
// 2
// 3
// 3

module.exports = EventEmitter