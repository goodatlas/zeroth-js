module.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t,n){"use strict";t.a={wsServerAddr:"13.125.232.133",wsServerPort:3180,wssServerAddr:"zeroth-test.goodatlas.com",wssServerPort:2087,sampleRate:44100,defaultParams:{language:"eng",finalOnly:!1,concatResult:!0,ws:!1}}},function(e,t,n){function r(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.i=function(e){return e},n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n.oe=function(e){throw console.error(e),e};var r=n(n.s=ENTRY_MODULE);return r.default||r}var o="[\\.|\\-|\\+|\\w|/|@]+",a="\\((/\\*.*?\\*/)?s?.*?("+o+").*?\\)";function c(e){return(e+"").replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&")}function i(e){return!isNaN(1*e)}function s(e,t,r){var s={};s[r]=[];var u=t.toString(),f=u.match(/^function\s?\(\w+,\s*\w+,\s*(\w+)\)/);if(!f)return s;for(var l,d=f[1],p=new RegExp("(\\\\n|\\W)"+c(d)+a,"g");l=p.exec(u);)"dll-reference"!==l[3]&&s[r].push(l[3]);for(p=new RegExp("\\("+c(d)+'\\("(dll-reference\\s('+o+'))"\\)\\)'+a,"g");l=p.exec(u);)e[l[2]]||(s[r].push(l[1]),e[l[2]]=n(l[1]).m),s[l[2]]=s[l[2]]||[],s[l[2]].push(l[4]);for(var h=Object.keys(s),y=0;y<h.length;y++)for(var m=0;m<s[h[y]].length;m++)i(s[h[y]][m])&&(s[h[y]][m]=1*s[h[y]][m]);return s}function u(e){return Object.keys(e).reduce(function(t,n){return t||e[n].length>0},!1)}e.exports=function(e,t){t=t||{};var o={main:n.m},a=t.all?{main:Object.keys(o.main)}:function(e,t){for(var n={main:[t]},r={main:[]},o={main:{}};u(n);)for(var a=Object.keys(n),c=0;c<a.length;c++){var i=a[c],f=n[i].pop();if(o[i]=o[i]||{},!o[i][f]&&e[i][f]){o[i][f]=!0,r[i]=r[i]||[],r[i].push(f);for(var l=s(e,e[i][f],i),d=Object.keys(l),p=0;p<d.length;p++)n[d[p]]=n[d[p]]||[],n[d[p]]=n[d[p]].concat(l[d[p]])}}return r}(o,e),c="";Object.keys(a).filter(function(e){return"main"!==e}).forEach(function(e){for(var t=0;a[e][t];)t++;a[e].push(t),o[e][t]="(function(module, exports, __webpack_require__) { module.exports = __webpack_require__; })",c=c+"var "+e+" = ("+r.toString().replace("ENTRY_MODULE",JSON.stringify(t))+")({"+a[e].map(function(t){return JSON.stringify(t)+": "+o[e][t].toString()}).join(",")+"});\n"}),c=c+"new (("+r.toString().replace("ENTRY_MODULE",JSON.stringify(e))+")({"+a.main.map(function(e){return JSON.stringify(e)+": "+o.main[e].toString()}).join(",")+"}))(self);";var i=new window.Blob([c],{type:"text/javascript"});if(t.bare)return i;var f=(window.URL||window.webkitURL||window.mozURL||window.msURL).createObjectURL(i),l=new window.Worker(f);return l.objectURL=f,l}},function(e,t,n){"use strict";n.r(t);var r=n(1),o=n.n(r);var a=null,c=function e(t){var n=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.init=function(){(a=o()(3)).postMessage({command:"init",params:n.params}),a.onmessage=function(e){switch(e.data.command){case"onerror":n.onerror(e.data.error);break;case"onconnect":n.onconnect(),n.onready();break;case"ondisconnect":n.ondisconnect(),a.terminate();break;case"ondata":n.ondata(e.data.data)}}},this.send=function(e){a.postMessage({command:"send",data:e})},this.disconnect=function(){a.postMessage({command:"disconnect"})};var r=function(){};this.onconnect=this.onconnect||r,this.onready=this.onready||r,this.ondisconnect=this.ondisconnect||r,this.ondata=this.ondata||r,this.onerror=this.onerror||r,this.params=t},i=window.AudioContext||window.webkitAudioContext,s=function(e){for(var t=e.length,n=new Int16Array(t);t--;)n[t]=32767*Math.min(1,e[t]);return n},u=n(0);function f(e){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function l(e){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function d(e,t){return(d=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function p(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var h=function(){},y=function(e){function t(e){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(n=function(e,t){return!t||"object"!==f(t)&&"function"!=typeof t?p(e):t}(this,l(t).call(this,e))).start=function(){return new Promise(function(e,t){var r=function(t){h("Successfully got UserMedia"),n.stream=t,n.recording(),e()},o=function(e){return t(e)},a={audio:!0,video:!1};if(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia)navigator.mediaDevices.getUserMedia(a).then(r,o);else{var c=navigator.webkitGetUserMedia||navigator.mozGetUserMedia;if(!c)return h("Couldn't found getUserMedia on your browser."),void t(new Error("Your browser dosen't support Media"));c(a).then(r,o)}})},n.recording=function(){n.init(n.params),n.onready=function(){var e=p(p(n)),t=e.bufferSize,r=e.channels,o=e.stream;n.context=new i;var a=n.context.createMediaStreamSource(o),c=n.context.createScriptProcessor(t,r,r);a.connect(c),c.connect(n.context.destination),c.onaudioprocess=n.onAudioProcess}},n.onAudioProcess=function(e){var t=e.inputBuffer.getChannelData(0),r=s(t);n.send(r)},n.stop=function(){n.context&&"closed"!==n.context.state&&n.context.close(),n.stream.getTracks().forEach(function(e){e.stop()}),n.disconnect()},n.params=e,n.stream=null,n.bufferSize=2048,n.channels=1,n.sampleRate=u.a.sampleRate,e.debug&&(h=function(){for(var e,t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return(e=console).log.apply(e,["[zerothjs:debug]"].concat(n))}),n.params=e,n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&d(e,t)}(t,c),t}();function m(e){return(m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function w(e,t){return!t||"object"!==m(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function b(e){return(b=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function g(e,t){return(g=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var v=function(e){function t(e){var n;if(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(n=w(this,b(t).call(this,e))).sendFile=function(){var e=n.file,t=new FileReader;t.onload=function(e){var t=new i,n=e.target.result;t.decodeAudioData(n,function(e){var t=e.getChannelData(0),n=s(t);zeroth.send(n),zeroth.disconnect()})},t.readAsArrayBuffer(e)},n.onready=function(){n.sendFile(n.file)},n.init(e),n.file=e.file,void 0===n.file)throw Error("Parameter `file` is required.");if(!/^audio/.test(n.file.type))throw Error("Expected Audio file but got ".concat(n.file.type," file."));return n.sampleRate=u.a.sampleRate,n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&g(e,t)}(t,c),t}();n.d(t,"ZerothBase",function(){return c}),n.d(t,"ZerothMic",function(){return y}),n.d(t,"ZerothFile",function(){return v})},function(e,t,n){"use strict";n.r(t);var r=n(0);function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var a=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.cache=[],this.result=""}return function(e,t,n){t&&o(e.prototype,t),n&&o(e,n)}(e,[{key:"add",value:function(e){if(e){var t=e.transcript,n="";return e.final?this.cache.includes(t)?void 0:(this.cache.push(t),n=this.cache.map(function(e){return e.charAt(0)+e.slice(1).toLowerCase().concat(".")}).join(" "),this.result=n,console.log({result:this.result,cache:this.cache,final:!0}),this.result):(n=this.cache.map(function(e){return e.charAt(0)+e.slice(1).toLowerCase().concat(".")}).join(" ").concat(t),this.result=n,console.log({result:this.result,cache:this.cache,final:!1}),this.result)}}},{key:"clean",value:function(){this.cache=[],this.result=""}}]),e}();function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"default",function(){return u});var i=function(){},s=null;function u(e){e.onmessage=function(e){switch(e.data.command){case"init":s=new f(e.data.params);break;case"disconnect":s.disconnect();break;case"send":s.send(e.data.data)}}}var f=function e(t){if(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),l.call(this),t&&t.key){t.debug&&(i=function(){for(var e,t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return(e=console).log.apply(e,["[zerothjs:debug]"].concat(n))});var n=r.a.defaultParams,o=n.language,a=n.finalOnly,c=n.ws,s=n.concatResult;this.params={key:t.key,language:t.language||o,finalOnly:t.finalOnly||a,concatResult:!t.concatResult||!s,ws:t.ws||c},this.ws=null,this.transcriptCache=null,this.connect()}else postMessage({command:"onerror",error:"API key missing"})},l=function(){var e=this;this.connect=function(){var t=r.a.wsServerAddr,n=r.a.wsServerPort,o=r.a.wssServerAddr,s=r.a.wssServerPort,u=r.a.sampleRate,f=e.params,l=f.key,d=f.language,p=f.finalOnly,h=f.ws,y="audio/x-raw,+layout=(string)interleaved,+rate=(int)".concat(u,",+format=(string)S16LE,+channels=(int)1"),m="content-type=".concat(y,"&key=").concat(l,"&language=").concat(d,"&final-only=").concat(p),w=h?"ws://".concat(t,":").concat(n,"/client/ws/speech?").concat(m):"wss://".concat(o,":").concat(s,"/client/ws/speech?").concat(m);i("uri",w),e.ws=new WebSocket(w),e.transcriptCache=new a,e.ws.onopen=function(){postMessage({command:"onconnect"}),e.transcriptCache.clean()},e.ws.onerror=function(e){i("websocket error",e.code,e.reason,e.message),postMessage({command:"onerror",error:e.message})},e.ws.onclose=function(t){i("websocket closed",t.code,t.reason,t.message),e.ws=null,e.transcriptCache.clean(),postMessage({command:"ondisconnect"})},e.ws.onmessage=function(t){var n=e.params.concatResult,r=JSON.parse(t.data),o=n?function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){c(e,t,n[t])})}return e}({},r,{transcript:e.transcriptCache.add(r)}):r;postMessage({command:"ondata",data:o})}},this.send=function(t){if(e.ws)try{e.ws.send(t)}catch(t){i("websocket send data error",t.code,t.reason,t.message),postMessage({command:"onerror",error:t.message}),e.ws.close()}},this.disconnect=function(){e.send("EOS")}}}]);