var Zeroth=function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=2)}([function(e,n,t){"use strict";n.a={wsServerAddr:"13.125.232.133",wsServerPort:3180,wssServerAddr:"zeroth-test.goodatlas.com",wssServerPort:2087,sampleRate:44100,defaultParams:{language:"eng",finalOnly:!1,ws:!1}}},function(e,n,t){function r(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="/",t.oe=function(e){throw console.error(e),e};var r=t(t.s=ENTRY_MODULE);return r.default||r}var o="[\\.|\\-|\\+|\\w|/|@]+",a="\\((/\\*.*?\\*/)?s?.*?("+o+").*?\\)";function i(e){return(e+"").replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&")}function c(e,n,r){var c={};c[r]=[];var s=n.toString(),u=s.match(/^function\s?\(\w+,\s*\w+,\s*(\w+)\)/);if(!u)return c;for(var f,l=u[1],d=new RegExp("(\\\\n|\\W)"+i(l)+a,"g");f=d.exec(s);)"dll-reference"!==f[3]&&c[r].push(f[3]);for(d=new RegExp("\\("+i(l)+'\\("(dll-reference\\s('+o+'))"\\)\\)'+a,"g");f=d.exec(s);)e[f[2]]||(c[r].push(f[1]),e[f[2]]=t(f[1]).m),c[f[2]]=c[f[2]]||[],c[f[2]].push(f[4]);for(var p,m=Object.keys(c),w=0;w<m.length;w++)for(var y=0;y<c[m[w]].length;y++)p=c[m[w]][y],isNaN(1*p)||(c[m[w]][y]=1*c[m[w]][y]);return c}function s(e){return Object.keys(e).reduce(function(n,t){return n||e[t].length>0},!1)}e.exports=function(e,n){n=n||{};var o={main:t.m},a=n.all?{main:Object.keys(o.main)}:function(e,n){for(var t={main:[n]},r={main:[]},o={main:{}};s(t);)for(var a=Object.keys(t),i=0;i<a.length;i++){var u=a[i],f=t[u].pop();if(o[u]=o[u]||{},!o[u][f]&&e[u][f]){o[u][f]=!0,r[u]=r[u]||[],r[u].push(f);for(var l=c(e,e[u][f],u),d=Object.keys(l),p=0;p<d.length;p++)t[d[p]]=t[d[p]]||[],t[d[p]]=t[d[p]].concat(l[d[p]])}}return r}(o,e),i="";Object.keys(a).filter(function(e){return"main"!==e}).forEach(function(e){for(var n=0;a[e][n];)n++;a[e].push(n),o[e][n]="(function(module, exports, __webpack_require__) { module.exports = __webpack_require__; })",i=i+"var "+e+" = ("+r.toString().replace("ENTRY_MODULE",JSON.stringify(n))+")({"+a[e].map(function(n){return JSON.stringify(n)+": "+o[e][n].toString()}).join(",")+"});\n"}),i=i+"new (("+r.toString().replace("ENTRY_MODULE",JSON.stringify(e))+")({"+a.main.map(function(e){return JSON.stringify(e)+": "+o.main[e].toString()}).join(",")+"}))(self);";var u=new window.Blob([i],{type:"text/javascript"});if(n.bare)return u;var f=(window.URL||window.webkitURL||window.mozURL||window.msURL).createObjectURL(u),l=new window.Worker(f);return l.objectURL=f,l}},function(e,n,t){"use strict";t.r(n);var r=t(1),o=t.n(r);var a=null,i=function e(n){var t=this;!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e),this.init=function(){(a=o()(3)).postMessage({command:"init",params:t.params}),a.onmessage=function(e){switch(e.data.command){case"onerror":t.onerror(e.data.error);break;case"onconnect":t.onconnect(),t.onready();break;case"ondisconnect":t.ondisconnect(),a.terminate();break;case"ondata":t.ondata(e.data.data)}}},this.send=function(e){a.postMessage({command:"send",data:e})},this.disconnect=function(){a.postMessage({command:"disconnect"})};var r=function(){};this.onconnect=this.onconnect||r,this.onready=this.onready||r,this.ondisconnect=this.ondisconnect||r,this.ondata=this.ondata||r,this.onerror=this.onerror||r,this.params=n},c=window.AudioContext||window.webkitAudioContext,s=function(e){for(var n=e.length,t=new Int16Array(n);n--;)t[n]=32767*Math.min(1,e[n]);return t},u=t(0);function f(e){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function l(e){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function d(e,n){return(d=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e})(e,n)}function p(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var m=function(){},w=function(e){function n(e){var t,r,o;return function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,n),r=this,o=l(n).call(this,e),(t=!o||"object"!==f(o)&&"function"!=typeof o?p(r):o).start=function(){return new Promise(function(e,n){var r=function(n){m("Successfully got UserMedia"),t.stream=n,t.recording(),e()},o=function(e){return n(e)},a={audio:!0,video:!1};if(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia)navigator.mediaDevices.getUserMedia(a).then(r,o);else{var i=navigator.webkitGetUserMedia||navigator.mozGetUserMedia;if(!i)return m("Couldn't found getUserMedia on your browser."),void n(new Error("Your browser dosen't support Media"));i(a).then(r,o)}})},t.recording=function(){t.init(t.params),t.onready=function(){var e=p(p(t)),n=e.bufferSize,r=e.channels,o=e.stream;t.context=new c;var a=t.context.createMediaStreamSource(o),i=t.context.createScriptProcessor(n,r,r);a.connect(i),i.connect(t.context.destination),i.onaudioprocess=t.onAudioProcess}},t.onAudioProcess=function(e){var n=e.inputBuffer.getChannelData(0),r=s(n);t.send(r)},t.stop=function(){t.context&&"closed"!==t.context.state&&t.context.close(),t.stream.getTracks().forEach(function(e){e.stop()}),t.disconnect()},t.params=e,t.stream=null,t.bufferSize=2048,t.channels=1,t.sampleRate=u.a.sampleRate,e.debug&&(m=function(){for(var e,n=arguments.length,t=new Array(n),r=0;r<n;r++)t[r]=arguments[r];return(e=console).log.apply(e,["[zerothjs:debug]"].concat(t))}),t.params=e,t}return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&d(e,n)}(n,i),n}();function y(e){return(y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function h(e,n){return!n||"object"!==y(n)&&"function"!=typeof n?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):n}function g(e){return(g=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function b(e,n){return(b=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e})(e,n)}var v=function(e){function n(e){var t;if(function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,n),(t=h(this,g(n).call(this,e))).sendFile=function(){var e=t.file,n=new FileReader;n.onload=function(e){var n=new c,t=e.target.result;n.decodeAudioData(t,function(e){var n=e.getChannelData(0),t=s(n);zeroth.send(t),zeroth.disconnect()})},n.readAsArrayBuffer(e)},t.onready=function(){t.sendFile(t.file)},t.init(e),t.file=e.file,void 0===t.file)throw Error("Parameter `file` is required.");if(!/^audio/.test(t.file.type))throw Error("Expected Audio file but got ".concat(t.file.type," file."));return t.sampleRate=u.a.sampleRate,t}return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&b(e,n)}(n,i),n}();t.d(n,"ZerothBase",function(){return i}),t.d(n,"ZerothMic",function(){return w}),t.d(n,"ZerothFile",function(){return v})},function(e,n,t){"use strict";t.r(n),t.d(n,"default",function(){return i});var r=t(0);var o=function(){},a=null;function i(e){e.onmessage=function(e){switch(e.data.command){case"init":a=new c(e.data.params);break;case"disconnect":a.disconnect();break;case"send":a.send(e.data.data)}}}var c=function e(n){if(function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e),s.call(this),n&&n.key){n.debug&&(o=function(){for(var e,n=arguments.length,t=new Array(n),r=0;r<n;r++)t[r]=arguments[r];return(e=console).log.apply(e,["[zerothjs:debug]"].concat(t))});var t=r.a.defaultParams,a=t.language,i=t.finalOnly,c=t.ws;this.params={key:n.key,language:n.language||a,finalOnly:n.finalOnly||i,ws:n.ws||c},this.ws=null,this.connect()}else postMessage({command:"onerror",error:"API key missing"})},s=function(){var e=this;this.connect=function(){var n=r.a.wsServerAddr,t=r.a.wsServerPort,a=r.a.wssServerAddr,i=r.a.wssServerPort,c=r.a.sampleRate,s=e.params,u=s.key,f=s.language,l=s.finalOnly,d=s.ws,p="audio/x-raw,+layout=(string)interleaved,+rate=(int)".concat(c,",+format=(string)S16LE,+channels=(int)1"),m="content-type=".concat(p,"&key=").concat(u,"&language=").concat(f,"&final-only=").concat(l),w=d?"ws://".concat(n,":").concat(t,"/client/ws/speech?").concat(m):"wss://".concat(a,":").concat(i,"/client/ws/speech?").concat(m);o("uri",w),e.ws=new WebSocket(w),e.ws.onopen=function(){postMessage({command:"onconnect"})},e.ws.onerror=function(e){o("websocket error",e.code,e.reason,e.message),postMessage({command:"onerror",error:e.message})},e.ws.onclose=function(n){o("websocket closed",n.code,n.reason,n.message),e.ws=null,postMessage({command:"ondisconnect"})},e.ws.onmessage=function(e){postMessage({command:"ondata",data:JSON.parse(e.data)})}},this.send=function(n){if(e.ws)try{e.ws.send(n)}catch(n){o("websocket send data error",n.code,n.reason,n.message),postMessage({command:"onerror",error:n.message}),e.ws.close()}},this.disconnect=function(){e.send("EOS")}}}]);