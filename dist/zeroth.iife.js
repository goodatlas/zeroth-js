var Zeroth = (function (exports) {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

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

  var Worker$1 = workerCtor('worker#./worker.js', function () {
    return function (e, r) {
      return e(r = {
        exports: {}
      }, r.exports), r.exports;
    }(function (module, exports) {
      var debug = function debug() {};

      var sock = null;
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

      module.exports = function worker(self) {
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

      var Socket = function Socket(params) {
        _classCallCheck(this, Socket);

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
          var wsServerAddr = config.wsServerAddr,
              wsServerPort = config.wsServerPort,
              wssServerAddr = config.wssServerAddr,
              wssServerPort = config.wssServerPort,
              sampleRate = config.sampleRate;
          var _this$params = _this.params,
              key = _this$params.key,
              language = _this$params.language,
              finalOnly = _this$params.finalOnly,
              ws = _this$params.ws;
          var contentType = "audio/x-raw,+layout=(string)interleaved,+rate=(int)".concat(sampleRate, ",+format=(string)S16LE,+channels=(int)1");
          var query = "content-type=".concat(contentType, "&key=").concat(key, "&language=").concat(language, "&final-only=").concat(finalOnly);
          var uri = ws ? "ws://".concat(wsServerAddr, ":").concat(wsServerPort, "/client/ws/speech?").concat(query) : "wss://".concat(wssServerAddr, ":").concat(wssServerPort, "/client/ws/speech?").concat(query);
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

  var ZerothBase = function ZerothBase(params) {
    var _this = this;

    _classCallCheck(this, ZerothBase);

    this.init = function () {
      worker = new Worker$1();
      worker.postMessage({
        command: 'init',
        params: _this.params
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

  var ZerothMic = function (_ZerothBase) {
    _inherits(ZerothMic, _ZerothBase);

    function ZerothMic(params) {
      var _this;

      _classCallCheck(this, ZerothMic);

      _this = _possibleConstructorReturn(this, (ZerothMic.__proto__ || Object.getPrototypeOf(ZerothMic)).call(this, params));

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
        _this.init(_this.params);

        _this.onready = function () {
          var _this2 = _this,
              bufferSize = _this2.bufferSize,
              channels = _this2.channels,
              stream = _this2.stream;
          _this.context = new CrossAudioContext();

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

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
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

  var ZerothFile = function (_ZerothBase) {
    _inherits(ZerothFile, _ZerothBase);

    function ZerothFile(params) {
      var _this;

      _classCallCheck(this, ZerothFile);

      _this = _possibleConstructorReturn(this, (ZerothFile.__proto__ || Object.getPrototypeOf(ZerothFile)).call(this, params));

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

  return exports;

}({}));
