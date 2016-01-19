/* global jasmine, beforeEach, describe, it, expect */

const IPCResponder = require('../index')

describe('IPCResponder', () => {
  beforeEach(() => {
    this.on = jasmine.createSpy('on')
    this.send = jasmine.createSpy('send')
    this.ipcResponder = new IPCResponder(this.send, this.on)
  })

  describe('constructor()', () => {
    it('should keep given send function inside the IPCResponder', () => {
      expect(this.ipcResponder.send).toEqual(this.send)
    })

    it('should initialize topicHandlers with an empty object', () => {
      expect(this.ipcResponder.topicHandlers).toEqual({})
    })

    it('should initialize awaitingResponseHandlers with an empty object', () => {
      expect(this.ipcResponder.awaitingResponseHandlers).toEqual({})
    })
  })

  describe('registerTopic()', () => {
    it('should set given topic handler for given topic to topicHandlers', () => {
      const topic = 'leia'
      const handler = 'han'
      this.ipcResponder.registerTopic(topic, handler)

      expect(this.ipcResponder.topicHandlers[topic]).toEqual(handler)
    })
  })
})
