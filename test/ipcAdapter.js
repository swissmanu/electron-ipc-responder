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
  })
})
