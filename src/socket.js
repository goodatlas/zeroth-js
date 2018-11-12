// TODO : This code was in base.worker.js.
// Should fix rollup-plugin-webworkify's babel problem
let debug = () => {};
class Socket {
  constructor(params, sampleRate) {
    if (!params) {
      postMessage({ command: 'onerror', error: 'Parameter missing' });
      return;
    }

    if (!params.accessToken) {
      debug("You don't have accessToken. Will use fallback way");
      if (!params.appSecret) {
        postMessage({
          command: 'onerror',
          error: 'Tried to issue access token, but appSecret is missing'
        });
        return;
      }
      if (!params.appId) {
        postMessage({
          command: 'onerror',
          error: 'Tried to issue access token, but appId is missing'
        });
        return;
      }
    }

    if (params.accessToken && params.appId) {
      postMessage({
        command: 'onerror',
        error: "You don't have to use appId if you already have accessToken"
      });
      return;
    }

    if (params.accessToken && params.appSecret) {
      postMessage({
        command: 'onerror',
        error: "You don't have to use appSecret if you already have accessToken"
      });
      return;
    }

    if (params.debug) {
      debug = (...args) => console.log('[zerothjs:debug]', ...args);
    }

    const { language, finalOnly, ws } = config.defaultParams;
    this.params = {
      language: params.language || language,
      finalOnly: params.finalOnly || finalOnly,
      ws: params.ws || ws
    };
    this.ws = null;
    this.sampleRate = sampleRate || config.sampleRate;

    if (!this.params.accessToken) {
      const { wssServerAddr, apiServerPort } = config;

      fetch(`https://${wssServerAddr}:${apiServerPort}/token`, {
        headers: {
          Authorization: `${params.appId}:${params.appSecret}`,
          'Access-Control-Allow-Origin': '*',
          'Proxy-Authorization': `${params.appId}:${params.appSecret}`
        },
        withCredential: true
      })
        .then(response => response.json())
        .then(response => {
          this.params['accessToken'] = response['access_token'];
          this.connect();
        })
        .catch(json => {
          postMessage({
            command: 'onerror',
            error: JSON.stringify(json)
          });
        });
    } else {
      this.params['accessToken'] = params.accessToken;
      this.connect();
    }
  }

  connect = () => {
    const { wsServerAddr, wsServerPort, wssServerAddr, wssServerPort } = config;
    const { accessToken, language, finalOnly, ws } = this.params;
    const contentType = `audio/x-raw,+layout=(string)interleaved,+rate=(int)${
      this.sampleRate
    },+format=(string)S16LE,+channels=(int)1`;
    const query = `access-token=${accessToken}&content-type=${contentType}&language=${language}&final-only=${finalOnly}`;
    const uri = ws
      ? `ws://${wsServerAddr}:${wsServerPort}/client/ws/speech?${query}`
      : `wss://${wssServerAddr}:${wssServerPort}/client/ws/speech?${query}`;

    debug('uri', uri);

    this.ws = new WebSocket(uri);

    this.ws.onopen = () => {
      postMessage({ command: 'onconnect' });
      debug('connected to zeroth', uri);
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
