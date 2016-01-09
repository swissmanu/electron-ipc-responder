# electron-ipc-adapter
[![Build Status](https://travis-ci.org/swissmanu/orchestra-jsapi.svg)](https://travis-ci.org/swissmanu/electron-ipc-adapter) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![npm version](https://badge.fury.io/js/electron-ipc-adapter.svg)](http://badge.fury.io/js/electron-ipc-adapter) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

A simple request/response based communication protocol for Electrons IPC functionality

The provided class `IPCAdapter` is used to set up the communication peers on Electrons [main and renderer process](http://electron.atom.io/docs/v0.36.0/tutorial/quick-start/#main-process). Once ready, `registerTopic()` can be used to make a specific function available to being called upon from the other peer. To do so, `ask()` and `tell()` is available. `ask` allows you to wait for an answer from the other peer, `tell` is just "fire and forget". Both return a promise for the ease of use.

Please refer to the [documentation](http://swissmanu.github.io/electron-ipc-adapter/) for more details or have a look at the provided [examples](https://github.com/swissmanu/electron-ipc-adapter/tree/master/examples).

## Installation

```bash
$ npm install electron-ipc-adapter --save
```

## License

Copyright (c) 2016 Manuel Alabor

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
