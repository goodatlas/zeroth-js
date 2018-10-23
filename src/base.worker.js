let sock = null;
let debug = () => {};

const config = {
  wsServerAddr: '13.125.232.133',
  wsServerPort: 3180,
  wssServerAddr: 'zeroth-test.goodatlas.com',
  wssServerPort: 2087,
  sampleRate: 44100,
  defaultParams: {
    language: 'eng',
    finalOnly: false,
    ws: false
  }
};
module.exports = function(self) {
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
};

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

      for ( var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
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

  this.connect = function() {
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

    _this.ws.onopen = function() {
      postMessage({ command: 'onconnect' });
    };

    _this.ws.onerror = function(e) {
      // TODO handle error codes
      debug('websocket error', e.code, e.reason, e.message);
      postMessage({ command: 'onerror', error: e.message });
    };

    _this.ws.onclose = function(e) {
      debug('websocket closed', e.code, e.reason, e.message);
      _this.ws = null;
      postMessage({ command: 'ondisconnect' });
    };

    _this.ws.onmessage = function(e) {
      // debug('received data', e.data);
      postMessage({ command: 'ondata', data: JSON.parse(e.data) });
    };
  };

  this.send = function(data) {
    if (!_this.ws) return;

    try {
      _this.ws.send(data);
    } catch (e) {
      debug('websocket send data error', e.code, e.reason, e.message);
      postMessage({ command: 'onerror', error: e.message });
      _this.ws.close();
    }
  };

  this.disconnect = function() {
    _this.send('EOS');
  };
};
