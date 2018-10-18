class Socket {
  constructor(params) {
    if (!params || !params.key) {
      postMessage({ command: 'onerror', error: 'API key missing' });
      return;
    }

    if (params.debug) {
      debug = (...args) => console.log('[zerothjs:debug]', ...args);
    }

    const { language, finalOnly, ws } = config.defaultParams;
    this.params = {
      key: params.key,
      language: params.language || language,
      finalOnly: params.finalOnly || finalOnly,
      ws: params.ws || ws
    };
    this.ws = null;
    this.connect();
  }

  connect = () => {
    const {
      wsServerAddr,
      wsServerPort,
      wssServerAddr,
      wssServerPort,
      sampleRate
    } = config;
    const { key, language, finalOnly, ws } = this.params;
    const contentType = `audio/x-raw,+layout=(string)interleaved,+rate=(int)${sampleRate},+format=(string)S16LE,+channels=(int)1`;
    const query = `content-type=${contentType}&key=${key}&language=${language}&final-only=${finalOnly}`;
    const uri = ws
      ? `ws://${wsServerAddr}:${wsServerPort}/client/ws/speech?${query}`
      : `wss://${wssServerAddr}:${wssServerPort}/client/ws/speech?${query}`;

    debug('uri', uri);

    this.ws = new WebSocket(uri);

    this.ws.onopen = () => {
      postMessage({ command: 'onconnect' });
    };

    this.ws.onerror = e => {
      // TODO handle error codes
      debug('websocket error', e.code, e.reason, e.message);
      postMessage({ command: 'onerror', error: e.message });
    };

    this.ws.onclose = e => {
      debug('websocket closed', e.code, e.reason, e.message);
      this.ws = null;
      postMessage({ command: 'ondisconnect' });
    };

    this.ws.onmessage = e => {
      // debug('received data', e.data);
      postMessage({ command: 'ondata', data: JSON.parse(e.data) });
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
