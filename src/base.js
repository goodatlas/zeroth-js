'use strict';

import Worker from 'worker#./base.worker.js';

let worker = null;

export default class ZerothBase {
  constructor(params = this.throwIfParamsMissing()) {
    const noop = () => {};
    this.onconnect = this.onconnect || noop;
    this.onready = this.onready || noop;
    this.ondisconnect = this.ondisconnect || noop;
    this.ondata = this.ondata || noop;
    this.onerror = this.onerror || noop;
    this.params = params;
  }

  init = () => {
    worker = new Worker();
    worker.postMessage({
      command: 'init',
      params: this.params,
      sampleRate
    });
    worker.onmessage = e => {
      switch (e.data.command) {
        case 'onerror':
          this.onerror(e.data.error);
          break;
        case 'onconnect':
          this.onconnect();
          this.onready();
          break;
        case 'ondisconnect':
          this.ondisconnect();
          worker.terminate();
          break;
        case 'ondata':
          this.ondata(e.data.data);
          break;
      }
    };
  };

  send = data => {
    worker.postMessage({
      command: 'send',
      data: data
    });
  };

  disconnect = () => {
    worker.postMessage({
      command: 'disconnect'
    });
  };
}
