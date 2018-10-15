import config from './config';
import TranscriptCahce from './transcriptCache';

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
    if (!params || !params.key) {
      postMessage({ command: 'onerror', error: 'API key missing' });
      return;
    }

    if (params.debug) {
      debug = (...args) => console.log('[zerothjs:debug]', ...args);
    }

    const { language, finalOnly, ws, concatResult } = config.defaultParams;
    this.params = {
      key: params.key,
      language: params.language || language,
      finalOnly: params.finalOnly || finalOnly,
      concatResult: !params.concatResult || !concatResult,
      ws: params.ws || ws
    };
    this.ws = null;
    this.transcriptCache = null;
    this.connect();
  }

  connect = () => {
    const { wsServerAddr, wsServerPort, wssServerAddr, wssServerPort, sampleRate } = config;
    const { key, language, finalOnly, ws } = this.params;
    const contentType = `audio/x-raw,+layout=(string)interleaved,+rate=(int)${sampleRate},+format=(string)S16LE,+channels=(int)1`;
    const query = `content-type=${contentType}&key=${key}&language=${language}&final-only=${finalOnly}`;
    const uri = ws
      ? `ws://${wsServerAddr}:${wsServerPort}/client/ws/speech?${query}`
      : `wss://${wssServerAddr}:${wssServerPort}/client/ws/speech?${query}`;

    debug('uri', uri);

    this.ws = new WebSocket(uri);
    this.transcriptCache = new TranscriptCahce();

    this.ws.onopen = () => {
      postMessage({ command: 'onconnect' });
      this.transcriptCache.clean();
    };

    this.ws.onerror = e => {
      // TODO handle error codes
      debug('websocket error', e.code, e.reason, e.message);
      postMessage({ command: 'onerror', error: e.message });
    };

    this.ws.onclose = e => {
      debug('websocket closed', e.code, e.reason, e.message);
      this.ws = null;
      this.transcriptCache.clean();
      postMessage({ command: 'ondisconnect' });
    };

    this.ws.onmessage = e => {
      // debug('received data', e.data);
      postMessage({ command: 'ondata', data: e.data });
    };
  };

  send = data => {
    if (!this.ws) return;

    try {
      this.ws.send(data);
    } catch (e) {
      debug('websocket send data error', e.code, e.reason, e.message);
      postMessage({ command: 'onerror', error: e.message });
      this.ws.close();
    }
  };

  disconnect = () => {
    this.send('EOS');
  };
}
