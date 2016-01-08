/* global jasmine, beforeEach, describe, it, expect */

const IPCAdapter = require('../index')

describe('IPCAdapter', () => {
  beforeEach(() => {
    this.on = jasmine.createSpy('on')
    this.send = jasmine.createSpy('send')
    this.ipcAdapter = new IPCAdapter(this.send, this.on)
  })

  describe('constructor()', () => {
    it('should keep given send function inside the IPCAdapter', () => {
      expect(this.ipcAdapter.send).toEqual(this.send)
    })

    it('should initialize topicHandlers with an empty object', () => {
      expect(this.ipcAdapter.topicHandlers).toEqual({})
    })

    it('should initialize awaitingResponseHandlers with an empty object', () => {
      expect(this.ipcAdapter.awaitingResponseHandlers).toEqual({})
    })
  })

  describe('registerTopic()', () => {
    it('should set given topic handler for given topic to topicHandlers', () => {
      const topic = 'leia'
      const handler = 'han'
      this.ipcAdapter.registerTopic(topic, handler)

      expect(this.ipcAdapter.topicHandlers[topic]).toEqual(handler)
    })
  })
})
