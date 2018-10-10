var Zeroth=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=7)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={wsServerAddr:"13.125.232.133",wsServerPort:3180,wssServerAddr:"zeroth-test.goodatlas.com",wssServerPort:2087,sampleRate:44100,defaultParams:{language:"eng",finalOnly:!1,ws:!1}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o=n(6),a=(r=o)&&r.__esModule?r:{default:r};var s=null;t.default=function e(t){var n=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.init=function(){(s=(0,a.default)(5)).postMessage({command:"init",params:n.params}),s.onmessage=function(e){switch(e.data.command){case"onerror":n.onerror(e.data.error);break;case"onconnect":n.onconnect(),n.onready();break;case"ondisconnect":n.ondisconnect(),s.terminate();break;case"ondata":n.ondata(e.data.data)}}},this.send=function(e){s.postMessage({command:"send",data:e})},this.disconnect=function(){s.postMessage({command:"disconnect"})};var r=function(){};this.onconnect=this.onconnect||r,this.onready=this.onready||r,this.ondisconnect=this.ondisconnect||r,this.ondata=this.ondata||r,this.onerror=this.onerror||r,this.params=t}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.CrossAudioContext=window.AudioContext||window.webkitAudioContext,t.convertFloat32ToInt16=function(e){for(var t=e.length,n=new Int16Array(t);t--;)n[t]=32767*Math.min(1,e[t]);return n}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=s(n(1)),o=n(2),a=s(n(0));function s(e){return e&&e.__esModule?e:{default:e}}var i=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));if(n.sendFile=function(){var e=n.file,t=new FileReader;t.onload=function(e){var t=new o.CrossAudioContext,n=e.target.result;t.decodeAudioData(n,function(e){var t=e.getChannelData(0),n=(0,o.convertFloat32ToInt16)(t);zeroth.send(n),zeroth.disconnect()})},t.readAsArrayBuffer(e)},n.onready=function(){n.sendFile(n.file)},n.init(e),n.file=e.file,void 0===n.file)throw Error("Parameter `file` is required.");if(!/^audio/.test(n.file.type))throw Error("Expected Audio file but got "+n.file.type+" file.");return n.sampleRate=a.default.sampleRate,n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,r.default),t}();t.default=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=s(n(1)),o=n(2),a=s(n(0));function s(e){return e&&e.__esModule?e:{default:e}}var i=function(){},c=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.start=function(){return new Promise(function(e,t){var r=function(t){i("Successfully got UserMedia"),n.stream=t,n.recording(),e()},o=function(e){return t(e)},a={audio:!0,video:!1};if(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia)navigator.mediaDevices.getUserMedia(a).then(r,o);else{var s=navigator.webkitGetUserMedia||navigator.mozGetUserMedia;if(!s)return i("Couldn't found getUserMedia on your browser."),void t(new Error("Your browser dosen't support Media"));s(a).then(r,o)}})},n.recording=function(){n.init(n.params),n.onready=function(){var e=n.bufferSize,t=n.channels,r=n.stream;n.context=new o.CrossAudioContext;var a=n.context.createMediaStreamSource(r),s=n.context.createScriptProcessor(e,t,t);a.connect(s),s.connect(n.context.destination),s.onaudioprocess=n.onAudioProcess}},n.onAudioProcess=function(e){var t=e.inputBuffer.getChannelData(0),r=(0,o.convertFloat32ToInt16)(t);n.send(r)},n.stop=function(){n.context&&"closed"!==n.context.state&&n.context.close(),n.stream.getTracks().forEach(function(e){e.stop()}),n.disconnect()},n.params=e,n.stream=null,n.bufferSize=2048,n.channels=1,n.sampleRate=a.default.sampleRate,e.debug&&(i=function(){for(var e,t=arguments.length,n=Array(t),r=0;r<t;r++)n[r]=arguments[r];return(e=console).log.apply(e,["[zerothjs:debug]"].concat(n))}),n.params=e,n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,r.default),t}();t.default=c},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){e.onmessage=function(e){switch(e.data.command){case"init":i=new c(e.data.params);break;case"disconnect":i.disconnect();break;case"send":i.send(e.data.data)}}};var r,o=n(0),a=(r=o)&&r.__esModule?r:{default:r};var s=function(){},i=null;var c=function e(t){if(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),u.call(this),t&&t.key){t.debug&&(s=function(){for(var e,t=arguments.length,n=Array(t),r=0;r<t;r++)n[r]=arguments[r];return(e=console).log.apply(e,["[zerothjs:debug]"].concat(n))});var n=a.default.defaultParams,r=n.language,o=n.finalOnly,i=n.ws;this.params={key:t.key,language:t.language||r,finalOnly:t.finalOnly||o,ws:t.ws||i},this.ws=null,this.connect()}else postMessage({command:"onerror",error:"API key missing"})},u=function(){var e=this;this.connect=function(){var t=a.default.wsServerAddr,n=a.default.wsServerPort,r=a.default.wssServerAddr,o=a.default.wssServerPort,i=a.default.sampleRate,c=e.params,u="content-type="+("audio/x-raw,+layout=(string)interleaved,+rate=(int)"+i+",+format=(string)S16LE,+channels=(int)1")+"&key="+c.key+"&language="+c.language+"&final-only="+c.finalOnly,f=c.ws?"ws://"+t+":"+n+"/client/ws/speech?"+u:"wss://"+r+":"+o+"/client/ws/speech?"+u;s("uri",f),e.ws=new WebSocket(f),e.ws.onopen=function(){postMessage({command:"onconnect"})},e.ws.onerror=function(e){s("websocket error",e.code,e.reason,e.message),postMessage({command:"onerror",error:e.message})},e.ws.onclose=function(t){s("websocket closed",t.code,t.reason,t.message),e.ws=null,postMessage({command:"ondisconnect"})},e.ws.onmessage=function(e){postMessage({command:"ondata",data:JSON.parse(e.data)})}},this.send=function(t){if(e.ws)try{e.ws.send(t)}catch(t){s("websocket send data error",t.code,t.reason,t.message),postMessage({command:"onerror",error:t.message}),e.ws.close()}},this.disconnect=function(){e.send("EOS")}}},function(e,t,n){function r(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.i=function(e){return e},n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n.oe=function(e){throw console.error(e),e};var r=n(n.s=ENTRY_MODULE);return r.default||r}var o="[\\.|\\-|\\+|\\w|/|@]+",a="\\((/\\*.*?\\*/)?s?.*?("+o+").*?\\)";function s(e){return(e+"").replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&")}function i(e,t,r){var i={};i[r]=[];var c=t.toString(),u=c.match(/^function\s?\(\w+,\s*\w+,\s*(\w+)\)/);if(!u)return i;for(var f,l=u[1],d=new RegExp("(\\\\n|\\W)"+s(l)+a,"g");f=d.exec(c);)"dll-reference"!==f[3]&&i[r].push(f[3]);for(d=new RegExp("\\("+s(l)+'\\("(dll-reference\\s('+o+'))"\\)\\)'+a,"g");f=d.exec(c);)e[f[2]]||(i[r].push(f[1]),e[f[2]]=n(f[1]).m),i[f[2]]=i[f[2]]||[],i[f[2]].push(f[4]);return i}function c(e){return Object.keys(e).reduce(function(t,n){return t||e[n].length>0},!1)}e.exports=function(e,t){t=t||{};var o={main:n.m},a=t.all?{main:Object.keys(o)}:function(e,t){for(var n={main:[t]},r={main:[]},o={main:{}};c(n);)for(var a=Object.keys(n),s=0;s<a.length;s++){var u=a[s],f=n[u].pop();if(o[u]=o[u]||{},!o[u][f]&&e[u][f]){o[u][f]=!0,r[u]=r[u]||[],r[u].push(f);for(var l=i(e,e[u][f],u),d=Object.keys(l),p=0;p<d.length;p++)n[d[p]]=n[d[p]]||[],n[d[p]]=n[d[p]].concat(l[d[p]])}}return r}(o,e),s="";Object.keys(a).filter(function(e){return"main"!==e}).forEach(function(e){for(var t=0;a[e][t];)t++;a[e].push(t),o[e][t]="(function(module, exports, __webpack_require__) { module.exports = __webpack_require__; })",s=s+"var "+e+" = ("+r.toString().replace("ENTRY_MODULE",JSON.stringify(t))+")({"+a[e].map(function(t){return JSON.stringify(t)+": "+o[e][t].toString()}).join(",")+"});\n"}),s=s+"("+r.toString().replace("ENTRY_MODULE",JSON.stringify(e))+")({"+a.main.map(function(e){return JSON.stringify(e)+": "+o.main[e].toString()}).join(",")+"})(self);";var u=new window.Blob([s],{type:"text/javascript"});if(t.bare)return u;var f=(window.URL||window.webkitURL||window.mozURL||window.msURL).createObjectURL(u),l=new window.Worker(f);return l.objectURL=f,l}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=s(n(1)),o=s(n(4)),a=s(n(3));function s(e){return e&&e.__esModule?e:{default:e}}t.default={ZerothBase:r.default,ZerothMic:o.default,ZerothFile:a.default}}]);