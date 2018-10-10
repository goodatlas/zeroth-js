define(['exports', 'webworkify-webpack'], function (exports, work) { 'use strict';

  work = work && work.hasOwnProperty('default') ? work['default'] : work;

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

  var worker = null;

  var ZerothBase = function ZerothBase(params) {
    var _this = this;

    _classCallCheck(this, ZerothBase);

    this.init = function () {
      worker = work(require.resolve('./worker.js'));
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

  Object.defineProperty(exports, '__esModule', { value: true });

});
