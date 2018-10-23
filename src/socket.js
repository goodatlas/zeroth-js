
// TODO : This code was in base.worker.js.
// Should fix rollup-plugin-webworkify's babel problem
let debug = () => {};
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

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

var Socket = function Socket(params) {
  _classCallCheck(this, Socket);

  _initialiseProps.call(this);

  if (!params || !params.key) {
    postMessage({ command: 'onerror', error: 'API key missing' });
    return;
  }

  if (params.debug) {
    debug = function debug() {
      var _console;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return (_console = console).log.apply(_console, ['[zerothjs:debug]'].concat(args));
    };
  }

  var _config$defaultParams = config.defaultParams,
    language = _config$defaultParams.language,
    finalOnly = _config$defaultParams.finalOnly,
    ws = _config$defaultParams.ws;

  this.params = {
    key: params.key,
    language: params.language || language,
    finalOnly: params.finalOnly || finalOnly,
    ws: params.ws || ws
  };
  this.ws = null;
  this.connect();
};

var _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.connect = function () {
    var _config = config,
      wsServerAddr = _config.wsServerAddr,
      wsServerPort = _config.wsServerPort,
      wssServerAddr = _config.wssServerAddr,
      wssServerPort = _config.wssServerPort,
      sampleRate = _config.sampleRate;
    var _params = _this.params,
      key = _params.key,
      language = _params.language,
      finalOnly = _params.finalOnly,
      ws = _params.ws;

    var contentType =
      'audio/x-raw,+layout=(string)interleaved,+rate=(int)' +
      sampleRate +
      ',+format=(string)S16LE,+channels=(int)1';
    var query =
      'content-type=' +
      contentType +
      '&key=' +
      key +
      '&language=' +
      language +
      '&final-only=' +
      finalOnly;
    var uri = ws
      ? 'ws://' + wsServerAddr + ':' + wsServerPort + '/client/ws/speech?' + query
      : 'wss://' + wssServerAddr + ':' + wssServerPort + '/client/ws/speech?' + query;

    debug('uri', uri);

    _this.ws = new WebSocket(uri);

    _this.ws.onopen = function () {
      postMessage({ command: 'onconnect' });
    };

    _this.ws.onerror = function (e) {
      // TODO handle error codes
      debug('websocket error', e.code, e.reason, e.message);
      postMessage({ command: 'onerror', error: e.message });
    };

    _this.ws.onclose = function (e) {
      debug('websocket closed', e.code, e.reason, e.message);
      _this.ws = null;
      postMessage({ command: 'ondisconnect' });
    };

    _this.ws.onmessage = function (e) {
      // debug('received data', e.data);
      postMessage({ command: 'ondata', data: JSON.parse(e.data) });
    };
  };

  this.send = function (data) {
    if (!_this.ws) return;

    try {
      _this.ws.send(data);
    } catch (e) {
      debug('websocket send data error', e.code, e.reason, e.message);
      postMessage({ command: 'onerror', error: e.message });
      _this.ws.close();
    }
  };

  this.disconnect = function () {
    _this.send('EOS');
  };
};
