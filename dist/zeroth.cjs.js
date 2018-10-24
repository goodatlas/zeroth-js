'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _classCallCheck = _interopDefault(require('@babel/runtime/helpers/classCallCheck'));
var _possibleConstructorReturn = _interopDefault(require('@babel/runtime/helpers/possibleConstructorReturn'));
var _getPrototypeOf = _interopDefault(require('@babel/runtime/helpers/getPrototypeOf'));
var _inherits = _interopDefault(require('@babel/runtime/helpers/inherits'));
var _assertThisInitialized = _interopDefault(require('@babel/runtime/helpers/assertThisInitialized'));

/*! rollup-plugin-webworkify/workerhelper.js v0.0.4 | MIT Licensed | Allex Wang <allex.wxn@gmail.com> */
var win = window, BlobBuilder = win.BlobBuilder || win.WebKitBlobBuilder || win.MozBlobBuilder || win.MSBlobBuilder, URL = win.URL || win.webkitURL || win.mozURL || win.msURL, SCRIPT_TYPE = "application/javascript", TARGET = "undefined" == typeof Symbol ? "__t" + +new Date() : Symbol(), Worker = win.Worker, nextTick = win.setImmediate || function(e) {
  return setTimeout(e, 1);
};

function workerCtor(e, t) {
  return function r(n) {
    var o = this;
    if (!(o instanceof r)) return new r(n);
    if (!t) return new Worker(e);
    if (Worker && !n) {
      var i = createSourceObject(';(function(f){f&&new(f.default?f["default"]:f)(self)}((' + t.toString() + ")()))"), a = new Worker(i);
      return URL.revokeObjectURL(i), o[TARGET] = a;
    }
    var c = new WorkerEmitter({
      close: function() {
        this.destroy();
      }
    }, o);
    Object.assign(new WorkerEmitter(o, c), {
      isThisThread: !0,
      terminate: function() {
        c.close(), this.destroy();
      }
    }), t().call(c, c);
  };
}

function WorkerEmitter(e, t) {
  var r = Object.create(null);
  return e.onmessage = null, e.addEventListener = function(e, t) {
    var n = r[e] || (r[e] = []);
    ~n.indexOf(t) || n.push(t);
  }, e.removeEventListener = function(e, t) {
    var n, o = r[e];
    o && -1 !== (n = o.indexOf(t)) && (o.splice(n, 1), o.length || delete r[e]);
  }, e.postMessage = function(r) {
    nextTick(function() {
      var n = r;
      if (t.onmessage) try {
        t.onmessage({
          data: n,
          target: e
        });
      } catch (e) {
        console.error(e);
      }
      t.emit("message", {
        type: "message",
        data: n,
        target: e,
        timeStamp: +new Date()
      });
    });
  }, e.emit = function(t, n) {
    var o = r[t];
    o && o.forEach(function(t, r) {
      return t.call(e, n);
    });
  }, e.destroy = function() {
    Object.keys(r).forEach(function(e) {
      var t = r[e];
      t && (t.length = 0, delete r[e]);
    }), r = null;
  }, e;
}

if (Worker) {
  var testWorker, objURL = createSourceObject("self.onmessage = function () {}"), testArray = new Uint8Array(1);
  try {
    if (/(?:Trident|Edge)\/(?:[567]|12)/i.test(navigator.userAgent)) throw new Error("Not available");
    (testWorker = new Worker(objURL)).postMessage(testArray, [ testArray.buffer ]);
  } catch (e) {
    Worker = null;
  } finally {
    URL.revokeObjectURL(objURL), testWorker && testWorker.terminate();
  }
}

function createSourceObject(e) {
  var t = SCRIPT_TYPE;
  try {
    return URL.createObjectURL(new Blob([ e ], {
      type: t
    }));
  } catch (n) {
    var r = new BlobBuilder();
    return r.append(e), URL.createObjectURL(r.getBlob(t));
  }
}

var Worker$1 = workerCtor('worker#./base.worker.js', function () {
  return function (e, r) {
    return e(r = {
      exports: {}
    }, r.exports), r.exports;
  }(function (module, exports) {
    var sock = null;

    var debug = function debug() {};

    var config = {
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

    module.exports = function (self) {
      self.onmessage = function (e) {
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

    function _classCallCheck$$1(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }

    var Socket = function Socket(params) {
      _classCallCheck$$1(this, Socket);

      _initialiseProps.call(this);

      if (!params || !params.key) {
        postMessage({
          command: 'onerror',
          error: 'API key missing'
        });
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
        var contentType = 'audio/x-raw,+layout=(string)interleaved,+rate=(int)' + sampleRate + ',+format=(string)S16LE,+channels=(int)1';
        var query = 'content-type=' + contentType + '&key=' + key + '&language=' + language + '&final-only=' + finalOnly;
        var uri = ws ? 'ws://' + wsServerAddr + ':' + wsServerPort + '/client/ws/speech?' + query : 'wss://' + wssServerAddr + ':' + wssServerPort + '/client/ws/speech?' + query;
        debug('uri', uri);
        _this.ws = new WebSocket(uri);

        _this.ws.onopen = function () {
          postMessage({
            command: 'onconnect'
          });
        };

        _this.ws.onerror = function (e) {
          // TODO handle error codes
          debug('websocket error', e.code, e.reason, e.message);
          postMessage({
            command: 'onerror',
            error: e.message
          });
        };

        _this.ws.onclose = function (e) {
          debug('websocket closed', e.code, e.reason, e.message);
          _this.ws = null;
          postMessage({
            command: 'ondisconnect'
          });
        };

        _this.ws.onmessage = function (e) {
          // debug('received data', e.data);
          postMessage({
            command: 'ondata',
            data: JSON.parse(e.data)
          });
        };
      };

      this.send = function (data) {
        if (!_this.ws) return;

        try {
          _this.ws.send(data);
        } catch (e) {
          debug('websocket send data error', e.code, e.reason, e.message);
          postMessage({
            command: 'onerror',
            error: e.message
          });

          _this.ws.close();
        }
      };

      this.disconnect = function () {
        _this.send('EOS');
      };
    };
  });
});

var worker = null;

var ZerothBase = function ZerothBase() {
  var _this = this;

  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.throwIfParamsMissing();

  _classCallCheck(this, ZerothBase);

  this.init = function () {
    worker = new Worker$1();
    worker.postMessage({
      command: 'init',
      params: _this.params,
      sampleRate: sampleRate
    });

    worker.onmessage = function (e) {
      switch (e.data.command) {
        case 'onerror':
          _this.onerror(e.data.error);

          break;

        case 'onconnect':
          _this.onconnect();

          _this.onready();

          break;

        case 'ondisconnect':
          _this.ondisconnect();

          worker.terminate();
          break;

        case 'ondata':
          _this.ondata(e.data.data);

          break;
      }
    };
  };

  this.send = function (data) {
    worker.postMessage({
      command: 'send',
      data: data
    });
  };

  this.disconnect = function () {
    worker.postMessage({
      command: 'disconnect'
    });
  };

  var noop = function noop() {};

  this.onconnect = this.onconnect || noop;
  this.onready = this.onready || noop;
  this.ondisconnect = this.ondisconnect || noop;
  this.ondata = this.ondata || noop;
  this.onerror = this.onerror || noop;
  this.params = params;
};

var CrossAudioContext = window.AudioContext || window.webkitAudioContext; // export const resample = (audioBuffer, targetSampleRate, onComplete) => {
//   const channels = audioBuffer.numberOfChannels;
//   const samples = audioBuffer.length * targetSampleRate / audioBuffer.sampleRate;
//   const offlineContext = new CrossOfflineAudioContext(channels, samples, targetSampleRate);
//   const bufferSource = offlineContext.createBufferSource();
//   bufferSource.buffer = audioBuffer;
//   bufferSource.connect(offlineContext.destination);
//   bufferSource.start(0);
//   offlineContext.oncomplete = e => onComplete(e.renderedBuffer);
//   offlineContext.startRendering();
// };

var convertFloat32ToInt16 = function convertFloat32ToInt16(buffer) {
  var l = buffer.length;
  var buf = new Int16Array(l);

  while (l--) {
    buf[l] = Math.min(1, buffer[l]) * 0x7fff;
  }

  return buf;
};

var config = {
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

var debug = function debug() {};

var ZerothMic =
/*#__PURE__*/
function (_ZerothBase) {
  _inherits(ZerothMic, _ZerothBase);

  function ZerothMic(params) {
    var _this;

    _classCallCheck(this, ZerothMic);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ZerothMic).call(this, params));

    _this.start = function () {
      return new Promise(function (resolve, reject) {
        var onSuccess = function onSuccess(stream) {
          debug('Successfully got UserMedia');
          _this.stream = stream;

          _this.recording();

          resolve();
        };

        var onError = function onError(err) {
          return reject(err);
        };

        var constraints = {
          audio: true,
          video: false
        };

        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

          if (!getUserMedia) {
            debug("Couldn't found getUserMedia on your browser.");
            reject(new Error("Your browser dosen't support Media"));
            return;
          }

          getUserMedia(constraints).then(onSuccess, onError);
        } else {
          navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
        }
      });
    };

    _this.recording = function () {
      _this.context = new CrossAudioContext();

      _this.init(_this.context.sampleRate);

      _this.onready = function () {
        var _assertThisInitialize = _assertThisInitialized(_assertThisInitialized(_this)),
            bufferSize = _assertThisInitialize.bufferSize,
            channels = _assertThisInitialize.channels,
            stream = _assertThisInitialize.stream;

        var source = _this.context.createMediaStreamSource(stream);

        var processor = _this.context.createScriptProcessor(bufferSize, channels, channels);

        source.connect(processor);
        processor.connect(_this.context.destination);
        processor.onaudioprocess = _this.onAudioProcess;
      };
    };

    _this.onAudioProcess = function (e) {
      var left = e.inputBuffer.getChannelData(0);
      var buf = convertFloat32ToInt16(left);

      _this.send(buf);
    };

    _this.stop = function () {
      if (_this.context && _this.context.state !== 'closed') _this.context.close();

      var tracks = _this.stream.getTracks();

      tracks.forEach(function (track) {
        track.stop();
      });

      _this.disconnect();
    };

    _this.params = params;
    _this.stream = null;
    _this.bufferSize = 2048;
    _this.channels = 1;
    _this.sampleRate = config.sampleRate;

    if (params.debug) {
      debug = function debug() {
        var _console;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return (_console = console).log.apply(_console, ['[zerothjs:debug]'].concat(args));
      };
    }

    _this.params = params;
    return _this;
  } // eslint-disable-next-line prettier/prettier


  return ZerothMic;
}(ZerothBase);

var ZerothFile =
/*#__PURE__*/
function (_ZerothBase) {
  _inherits(ZerothFile, _ZerothBase);

  function ZerothFile(params) {
    var _this;

    _classCallCheck(this, ZerothFile);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ZerothFile).call(this, params));

    _this.sendFile = function () {
      var file = _this.file;
      var reader = new FileReader();

      reader.onload = function (e) {
        var audioCtx = new CrossAudioContext();
        var buf = e.target.result;
        audioCtx.decodeAudioData(buf, function (audioBuffer) {
          var left = audioBuffer.getChannelData(0);
          var buf = convertFloat32ToInt16(left);
          zeroth.send(buf);
          zeroth.disconnect();
        });
      };

      reader.readAsArrayBuffer(file);
    };

    _this.onready = function () {
      _this.sendFile(_this.file);
    };

    _this.init(params);

    _this.file = params.file;

    if (_this.file === undefined) {
      throw Error('Parameter `file` is required.');
    }

    if (!/^audio/.test(_this.file.type)) {
      throw Error("Expected Audio file but got ".concat(_this.file.type, " file."));
    }

    _this.sampleRate = config.sampleRate;
    return _this;
  }

  return ZerothFile;
}(ZerothBase);

exports.ZerothBase = ZerothBase;
exports.ZerothMic = ZerothMic;
exports.ZerothFile = ZerothFile;
