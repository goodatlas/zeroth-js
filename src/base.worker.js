let sock = null;
let debug = () => {};

const config = {
  wsServerAddr: '13.125.232.133',
  wsServerPort: 3180,
  wssServerAddr: 'zeroth.goodatlas.com',
  wssServerPort: 2087,
  apiServerPort: 2053,
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

var Socket = function Socket(params, sampleRate) {
  var _this = this;

  _classCallCheck(this, Socket);

  _initialiseProps.call(this);

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
    debug = function debug() {
      var _console;

      for (
        var _len = arguments.length, args = Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        args[_key] = arguments[_key];
      }

      return (_console = console).log.apply(
        _console,
        ['[zerothjs:debug]'].concat(args)
      );
    };
  }

  var _config$defaultParams = config.defaultParams,
    language = _config$defaultParams.language,
    finalOnly = _config$defaultParams.finalOnly,
    ws = _config$defaultParams.ws;

  this.params = {
    language: params.language || language,
    finalOnly: params.finalOnly || finalOnly,
    ws: params.ws || ws
  };
  this.ws = null;
  this.sampleRate = sampleRate || config.sampleRate;

  if (!this.params.accessToken) {
    var _config = config,
      wssServerAddr = _config.wssServerAddr,
      apiServerPort = _config.apiServerPort;

    fetch('https://' + wssServerAddr + ':' + apiServerPort + '/token', {
      headers: {
        Authorization: params.appId + ':' + params.appSecret,
        'Access-Control-Allow-Origin': '*',
        'Proxy-Authorization': params.appId + ':' + params.appSecret
      },
      withCredential: true
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        _this.params['accessToken'] = response['access_token'];
        _this.connect();
      })
      .catch(function(json) {
        postMessage({
          command: 'onerror',
          error: JSON.stringify(json)
        });
      });
  } else {
    this.params['accessToken'] = params.accessToken;
    this.connect();
  }
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.connect = function() {
    var _config2 = config,
      wsServerAddr = _config2.wsServerAddr,
      wsServerPort = _config2.wsServerPort,
      wssServerAddr = _config2.wssServerAddr,
      wssServerPort = _config2.wssServerPort;
    var _params = _this2.params,
      accessToken = _params.accessToken,
      language = _params.language,
      finalOnly = _params.finalOnly,
      ws = _params.ws;

    var contentType =
      'audio/x-raw,+layout=(string)interleaved,+rate=(int)' +
      _this2.sampleRate +
      ',+format=(string)S16LE,+channels=(int)1';
    var query =
      'access-token=' +
      accessToken +
      '&content-type=' +
      contentType +
      '&language=' +
      language +
      '&final-only=' +
      finalOnly;
    var uri = ws
      ? 'ws://' +
        wsServerAddr +
        ':' +
        wsServerPort +
        '/client/ws/speech?' +
        query
      : 'wss://' +
        wssServerAddr +
        ':' +
        wssServerPort +
        '/client/ws/speech?' +
        query;

    debug('uri', uri);

    _this2.ws = new WebSocket(uri);

    _this2.ws.onopen = function() {
      postMessage({ command: 'onconnect' });
      debug('connected to zeroth', uri);
    };

    _this2.ws.onerror = function(e) {
      // TODO handle error codes
      debug('websocket error', e.code, e.reason, e.message);
      postMessage({ command: 'onerror', error: e.message });
    };

    _this2.ws.onclose = function(e) {
      debug('websocket closed', e.code, e.reason, e.message);
      _this2.ws = null;
      postMessage({ command: 'ondisconnect' });
    };

    _this2.ws.onmessage = function(e) {
      // debug('received data', e.data);
      postMessage({ command: 'ondata', data: JSON.parse(e.data) });
    };
  };

  this.send = function(data) {
    if (!_this2.ws) return;

    try {
      _this2.ws.send(data);
    } catch (e) {
      debug('websocket send data error', e.code, e.reason, e.message);
      postMessage({ command: 'onerror', error: e.message });
      _this2.ws.close();
    }
  };

  this.disconnect = function() {
    _this2.send('EOS');
  };
};
