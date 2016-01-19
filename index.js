'use strict'

const uuid = require('node-uuid')
const IPCResponderChannel = 'electron-ipc-responder'

/**
 * <p>
 *   IPCResponder is a base class for implementing communication partners which
 *   use [Electrons]{@link http://electron.atom.io/} Inter Process Communication
 *   (IPC) facilities.
 * </p>
 * <p>
 *   With {@link IPCResponder#registerTopic} you can register a topic which can be
 *   called by the other peer. Vica versa, {@link IPCResponder#ask} and
 *   {@link IPCResponder#tell} allow to call upon such topics.
 * </p>
 *
 * @example <caption>Create IPCResponder for Host Process</caption>
 * const electron = require('electron')
 * let mainWindow = new electron.BrowserWindow()
 * const ipcMain = electron.ipcMain
 * const webContents = mainWindow.webContents
 *
 * class HostIPCResponder extends IPCResponder {
 *   constructor() {
 *     super(webContents.send.bind(webContents), ipcMain.on.bind(ipcMain))
 *
 *     this.registerTopic('hello', (payload) => Promise.resolve({
 *       text: 'hello ' + payload.name + ' too'
 *     })
 *   }
 * }
 * @example <caption>Create IPCResponder for Renderer Process</caption>
 * const ipcRenderer = window.require('electron').ipcRenderer
 *
 * class RendererIPCResponder extends IPCResponder {
 *   constructor() {
 *     super(ipcRenderer.send.bind(ipcRenderer), ipcRenderer.on.bind(ipcRenderer))
 *   }
 *
 *   sayHelloToHost(name) {
 *     return this.ask('hello', { name }).then((payload) => payload.text)
 *   }
 * }
 */
class IPCResponder {

  /**
   * Creates a new IPCResponder and sets up the communication stack.
   *
   * @param {function} send A function that allows sending an event via the IPC
   *                        infrastructure
   * @param {function} on A function that allows setting up a listener on the
   *                      IPC infrastructure
   */
  constructor (send, on) {
    this.send = send
    this.topicHandlers = {}
    this.awaitingResponseHandlers = {}

    on(IPCResponderChannel, (event, envelope) => {
      const topic = envelope.topic
      const id = envelope.id
      const payload = envelope.payload

      if (typeof (topic) === 'string' && topic.length > 0 && this.topicHandlers[topic] != null) {
        // Handle incoming request for topic:
        this.topicHandlers[topic](payload)
          .then((responsePayload) => {
            event.sender.send(IPCResponderChannel, { id, payload: responsePayload })
          })
      } else if (typeof (id) === 'string' && id.length > 0 && this.awaitingResponseHandlers[id] != null) {
        // Handle a response we are waiting for:
        this.awaitingResponseHandlers[id].resolve(payload)
        delete this.awaitingResponseHandlers[id]
      }
    })
  }

  /**
   * Register a topic which this IPCResponder should be able to call upon. Given
   * handler function has to return a promise.
   *
   * @param {string} topic Name of the topic to register
   * @param {function} handler A handler function to register for given topic.
   *                           This will be called every time the the given
   *                           topic was called via {@link IPCResponder#ask} or
   *                           {@link IPCResponder#tell}. It has to return a
   *                           promise.
   */
  registerTopic (topic, handler) {
    this.topicHandlers[topic] = handler
  }

  /**
   * Request a response for given topic of the counterparty. The payload
   * parameter will be sent along with your request. If you want to just send a
   * message without waiting for response, see {@link IPCResponder#tell}.
   *
   * @param {string} topic Topic to request response for
   * @param {object} payload Data to send to the counterparty. This is
   *                         optional. Default is an empty object.
   * @return {promise} A promise that resolves with the payload returned from
   *                   the topic handler registered with
   *                   {@link IPCResponder#registerTopic}.
   */
  ask (topic, payload) {
    const id = uuid.v4()
    const timestamp = new Date()

    if (payload == null) {
      payload = {}
    }

    return new Promise((resolve, reject) => {
      this.awaitingResponseHandlers[id] = { id, timestamp, resolve, reject }
      this.send(IPCResponderChannel, { id, topic, payload })
    })
  }

  /**
   * Same as {@link IPCResponder#ask}, tell allows to send a request to the
   * communication counterparty. Instead expecting a response, this is "fire and
   * forget". So the returned promise will get resolved immediately, no matter
   * what the other side returns (if it returns anything at all).
   *
   * @param {string} topic Topic to request response for
   * @param {object} payload Data to send to the counterparty. This is
   *                         optional. Default is undefined. You can pass
   *                         processResponsePayload instead of payload for a
   *                         shorter function call signature.
   * @return {promise} A promise that gets resolved immediately after the
   *                   request was sent
   */
  tell (topic, payload) {
    const id = uuid.v4()
    this.send(IPCResponderChannel, { id, topic, payload })
    return Promise.resolve()
  }
}

module.exports = IPCResponder
