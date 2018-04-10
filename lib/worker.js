'use strict';

import config from './config';

let debug = () => {};
let sock = null;

export default function worker(self) {
  self.onmessage = e => {
    switch (e.data.command) {
      case 'init':
        sock = new Socket(e.data.params);
        break;
      case 'disconnect':
        sock.disconnect();
        break;
      case 'send':
        sock.send(e.data.data);
        break;
    }
  };
}

class Socket {
  constructor(params) {
    if (!params || !params.apiKey) {
      postMessage({ command: 'onerror', error: 'apiKey missing' });
      return;
    }

    if (params.debug) {
      debug = (...args) => console.log('zerothjs:debug', ...args);
    }

    this.apiKey = params.apiKey;
    this.ws = null;
    this.connect();
  }

  connect = () => {
    const { serverAddr, serverPort, sampleRate, dialogId } = config;
    const contentType = `audio/x-raw,+layout=(string)interleaved,+rate=(int)${sampleRate},+format=(string)S16LE,+channels=(int)1`;
    // TODO replace dialogId with this.apiKey
    const uri = `ws://${serverAddr}:${serverPort}/client/ws/speech?content-type=${contentType}&dialog_id=${dialogId}`;
    debug('uri', uri);

    this.ws = new WebSocket(uri);

    this.ws.onopen = () => {
      postMessage({ command: 'onconnect' });
    };

    this.ws.onerror = e => {
      postMessage({ command: 'onerror', error: e.message });
    };

    this.ws.onclose = e => {
      debug('onclose', e.code, e.reason, e.message);
      this.ws = null;
      postMessage({ command: 'ondisconnect' });
    };

    this.ws.onmessage = e => {
      // debug('received data', e.data);
      const res = JSON.parse(e.data);
      if (res.status !== 0) {
        debug(JSON.stringify(res));
        postMessage({ command: 'onerror', error: res.message });
        return;
      }
      if (res.result) {
        postMessage({ command: 'ondata', data: res.result.hypotheses[0].transcript });
      }
    };
  };

  send = data => {
    if (!this.ws) return;

    try {
      this.ws.send(data);
    } catch (error) {
      postMessage({ command: 'onerror', error: error.message });
      this.ws.close();
    }
  };

  disconnect = () => {
    this.send('EOS');
  };
}
