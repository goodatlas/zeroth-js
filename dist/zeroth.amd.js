define(['exports'], function (exports) { 'use strict';

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

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var webworkifyWebpack = createCommonjsModule(function (module) {
  function webpackBootstrapFunc (modules) {
  /******/  // The module cache
  /******/  var installedModules = {};

  /******/  // The require function
  /******/  function __webpack_require__(moduleId) {

  /******/    // Check if module is in cache
  /******/    if(installedModules[moduleId])
  /******/      return installedModules[moduleId].exports;

  /******/    // Create a new module (and put it into the cache)
  /******/    var module = installedModules[moduleId] = {
  /******/      i: moduleId,
  /******/      l: false,
  /******/      exports: {}
  /******/    };

  /******/    // Execute the module function
  /******/    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

  /******/    // Flag the module as loaded
  /******/    module.l = true;

  /******/    // Return the exports of the module
  /******/    return module.exports;
  /******/  }

  /******/  // expose the modules object (__webpack_modules__)
  /******/  __webpack_require__.m = modules;

  /******/  // expose the module cache
  /******/  __webpack_require__.c = installedModules;

  /******/  // identity function for calling harmony imports with the correct context
  /******/  __webpack_require__.i = function(value) { return value; };

  /******/  // define getter function for harmony exports
  /******/  __webpack_require__.d = function(exports, name, getter) {
  /******/    if(!__webpack_require__.o(exports, name)) {
  /******/      Object.defineProperty(exports, name, {
  /******/        configurable: false,
  /******/        enumerable: true,
  /******/        get: getter
  /******/      });
  /******/    }
  /******/  };

  /******/  // define __esModule on exports
  /******/  __webpack_require__.r = function(exports) {
  /******/    Object.defineProperty(exports, '__esModule', { value: true });
  /******/  };

  /******/  // getDefaultExport function for compatibility with non-harmony modules
  /******/  __webpack_require__.n = function(module) {
  /******/    var getter = module && module.__esModule ?
  /******/      function getDefault() { return module['default']; } :
  /******/      function getModuleExports() { return module; };
  /******/    __webpack_require__.d(getter, 'a', getter);
  /******/    return getter;
  /******/  };

  /******/  // Object.prototype.hasOwnProperty.call
  /******/  __webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

  /******/  // __webpack_public_path__
  /******/  __webpack_require__.p = "/";

  /******/  // on error function for async loading
  /******/  __webpack_require__.oe = function(err) { console.error(err); throw err; };

    var f = __webpack_require__(__webpack_require__.s = ENTRY_MODULE);
    return f.default || f // try to call default if defined to also support babel esmodule exports
  }

  var moduleNameReqExp = '[\\.|\\-|\\+|\\w|\/|@]+';
  var dependencyRegExp = '\\((\/\\*.*?\\*\/)?\s?.*?(' + moduleNameReqExp + ').*?\\)'; // additional chars when output.pathinfo is true

  // http://stackoverflow.com/a/2593661/130442
  function quoteRegExp (str) {
    return (str + '').replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&')
  }

  function getModuleDependencies (sources, module, queueName) {
    var retval = {};
    retval[queueName] = [];

    var fnString = module.toString();
    var wrapperSignature = fnString.match(/^function\s?\(\w+,\s*\w+,\s*(\w+)\)/);
    if (!wrapperSignature) return retval
    var webpackRequireName = wrapperSignature[1];

    // main bundle deps
    var re = new RegExp('(\\\\n|\\W)' + quoteRegExp(webpackRequireName) + dependencyRegExp, 'g');
    var match;
    while ((match = re.exec(fnString))) {
      if (match[3] === 'dll-reference') continue
      retval[queueName].push(match[3]);
    }

    // dll deps
    re = new RegExp('\\(' + quoteRegExp(webpackRequireName) + '\\("(dll-reference\\s(' + moduleNameReqExp + '))"\\)\\)' + dependencyRegExp, 'g');
    while ((match = re.exec(fnString))) {
      if (!sources[match[2]]) {
        retval[queueName].push(match[1]);
        sources[match[2]] = __webpack_require__(match[1]).m;
      }
      retval[match[2]] = retval[match[2]] || [];
      retval[match[2]].push(match[4]);
    }

    return retval
  }

  function hasValuesInQueues (queues) {
    var keys = Object.keys(queues);
    return keys.reduce(function (hasValues, key) {
      return hasValues || queues[key].length > 0
    }, false)
  }

  function getRequiredModules (sources, moduleId) {
    var modulesQueue = {
      main: [moduleId]
    };
    var requiredModules = {
      main: []
    };
    var seenModules = {
      main: {}
    };

    while (hasValuesInQueues(modulesQueue)) {
      var queues = Object.keys(modulesQueue);
      for (var i = 0; i < queues.length; i++) {
        var queueName = queues[i];
        var queue = modulesQueue[queueName];
        var moduleToCheck = queue.pop();
        seenModules[queueName] = seenModules[queueName] || {};
        if (seenModules[queueName][moduleToCheck] || !sources[queueName][moduleToCheck]) continue
        seenModules[queueName][moduleToCheck] = true;
        requiredModules[queueName] = requiredModules[queueName] || [];
        requiredModules[queueName].push(moduleToCheck);
        var newModules = getModuleDependencies(sources, sources[queueName][moduleToCheck], queueName);
        var newModulesKeys = Object.keys(newModules);
        for (var j = 0; j < newModulesKeys.length; j++) {
          modulesQueue[newModulesKeys[j]] = modulesQueue[newModulesKeys[j]] || [];
          modulesQueue[newModulesKeys[j]] = modulesQueue[newModulesKeys[j]].concat(newModules[newModulesKeys[j]]);
        }
      }
    }

    return requiredModules
  }

  module.exports = function (moduleId, options) {
    options = options || {};
    var sources = {
      main: __webpack_modules__
    };

    var requiredModules = options.all ? { main: Object.keys(sources) } : getRequiredModules(sources, moduleId);

    var src = '';

    Object.keys(requiredModules).filter(function (m) { return m !== 'main' }).forEach(function (module) {
      var entryModule = 0;
      while (requiredModules[module][entryModule]) {
        entryModule++;
      }
      requiredModules[module].push(entryModule);
      sources[module][entryModule] = '(function(module, exports, __webpack_require__) { module.exports = __webpack_require__; })';
      src = src + 'var ' + module + ' = (' + webpackBootstrapFunc.toString().replace('ENTRY_MODULE', JSON.stringify(entryModule)) + ')({' + requiredModules[module].map(function (id) { return '' + JSON.stringify(id) + ': ' + sources[module][id].toString() }).join(',') + '});\n';
    });

    src = src + '(' + webpackBootstrapFunc.toString().replace('ENTRY_MODULE', JSON.stringify(moduleId)) + ')({' + requiredModules.main.map(function (id) { return '' + JSON.stringify(id) + ': ' + sources.main[id].toString() }).join(',') + '})(self);';

    var blob = new window.Blob([src], { type: 'text/javascript' });
    if (options.bare) { return blob }

    var URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

    var workerUrl = URL.createObjectURL(blob);
    var worker = new window.Worker(workerUrl);
    worker.objectURL = workerUrl;

    return worker
  };
  });

  var work = unwrapExports(webworkifyWebpack);
  var webworkifyWebpack_1 = webworkifyWebpack.work;

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
