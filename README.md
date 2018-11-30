<p align="center">
  <img src="http://d2tdgk679sf0nn.cloudfront.net/zeroth/zeroth-js.svg" width="400" alt="zeroth-js"/>
</p>
<p align="center">
 <small>zeroth-js is a browser-based JavaScript client library for <a href="https://zeroth-cloud.goodatlas.com" target="_blank">Zeroth Cloud</a>.<br/></small>
</p>

<p align="center">
    <a href="https://github.com/goodatlas/zeroth-js"><img src="https://img.shields.io/badge/dynamic/json.svg?uri=https://raw.githubusercontent.com/goodatlas/zeroth-js/master/package.json&query=$.version&label=master&prefix=v&style=flat"/></a>
  <a href="https://github.com/goodatlas/zeroth-js/tree/develop"><img src="https://img.shields.io/badge/dynamic/json.svg?uri=https://raw.githubusercontent.com/goodatlas/zeroth-js/develop/package.json&query=$.version&label=develop&prefix=v&colorB=10ADED&style=flat"/></a>
        <a href="https://github.com/goodatlas/zeroth-js"><img src="https://img.shields.io/github/size/goodatlas/zeroth-js/dist/zeroth.min.js.svg"/></a>
</p>

<p align="center"><a href="https://zeroth.gitbook.io/doc" target="_blank">Zeroth Documentation</a> | <a href="https://zeroth-cloud.goodatlas.com" target="_blank">Landing page</a> | <a href="https://zeroth-console.goodatlas.com" target="_blank">Dashboard</a> </p>

> ⚠️ current `zeroth-js` is beta version! There's can be bugs and issues ⚠️

---

* [ZerothBase](#zerothbase)
  * Just help you to connect with Zeroth.
  * You should implement functions such as recording stuffs, sending file stuffs.
  * But You can customize yourself.

- [ZerothMic](#zerothmic)

  * It's extend of ZerothBase with microphone recording function.
  * You can use real-time STT easily.

- [ZerothFile](#zerothfile)(Working in progress)
  * It's extend of ZerothBase with sending file function.
  * You can transcribed text via sending audio file to zeroth.

# Installation

## NPM

```bash
npm install goodatlas/zeroth-js
```

Using this method, you can `import` zeroth-js like:

### ES6

```js
import { ZerothBase } from 'zeroth-js';
// or
import { ZerothMic } from 'zeroth-js';
// or
import { ZerothFile } from 'zeroth-js';
```

### ES5 - CommonJS

```js
var ZerothBase = require('zeroth-js').ZerothBase;
// or
var ZerothMic = require('zeroth-js').ZerothMic;
// or
var ZerothFile = require('zeroth-js').ZerothFile;
```

## CDN

Include the js file directly in your web app using a `<script>` tag.

```html
<script src="https://somecdn/zeroth.min.js"></script>
```

### ES5 - UMD Build

```js
var ZerothBase = Zeroth.ZerothBase;
// or
var ZerothMic = Zeroth.ZerothMic;
// or
var ZerothFile = Zeroth.ZerothFile;
```

# Get Access Token

There's two way to get access token in `zeroth-js`.

## Using with Server (Secure way, Recommended)

You should add one API endpoint in your server to get accessToken.<br/>
Please check this [REST API document](https://zeroth.gitbook.io/doc/guides-1/rest-api).

Create GET endpoint named `/get-token` (whatever you want) in your server.
This endpoint will return response of our this REST API.

<details>
  <summary>
    <b>Example</b>
  </summary>
  <p>

If you are using `node.js`, `express` and `axios` , Your code will look like below.

```js
const express = require('express');
const axios = require('axios');
const app = express();
​
app.get('/get-token', function (req, res) {
  const url = 'https://zeroth-test.goodatlas.com:2053/token';
  const opt = {
    headers: {
        Authorization : `$YOUR_APP_ID:$YOUR_APP_SECRET`
      }
    };
  axios.get(url, opt)
    .then(({ data }) => res.send(data['access_token']))
    // Your error handler here
})
```

> !important you have to replace $YOUR_APP_ID and $YOUR_APP_SECRETwith yours from Zeroth Console ( https://zeroth-console.goodatlas.com​). You will have to create new application

That's all what you need in server side.

  </p>
</details>

## Using without Server  (Less secure but simple way)

zeroth-js will issue `accessToken` based on your `appId`, `appSecret` in [parameter](#parameters).

# Parameters

Using with server ([Link](#user-content-using-with-server-secure-way-recommended))
```js
const params = {
language: 'kor', // Required. You can choose 'eng' for English or 'kor' for Korean
accessToken: '$YOUR_ACCESS_TOKEN', // Required. You should get access token from your sever
finalOnly: false, // Optional(Default: false) If this is 'true', you will get only final results.
ws: false, // Optional(Default: false) We are using WebSocket Secure (wss). If this is true, we will use 'ws' instead of 'wss'
debug: true // Optional(Default: false) If this is 'true', you will get all logs from Zeroth.
}
```

Using without server ([Link](#user-content-using-without-server--less-secure-but-simple-way))

```js
const params = {
language: 'kor', // Required. You can choose 'eng' for English or 'kor' for Korean
appId: '$YOUR_APP_ID', // Required. You can get your appId with create new application in zeroth-console
appSecret: '$YOUR_APP_SECRET', // Required. You can get your appSecret with create new application in zeroth-console
finalOnly: false, // Optional(Default: false) If this is 'true', you will get only final results.
ws: false, // Optional(Default: false) We are using WebSocket Secure (wss). If this is true, we will use 'ws' instead of 'wss'
debug: true // Optional(Default: false) If this is 'true', you will get all logs from Zeroth.
}
```

# Usage

## ZerothBase

> Just help you to connect with Zeroth.<br/>You should implement functions such as recording stuffs, sending file stuffs.<br/>But You can customize yourself.

([Example](https://github.com/goodatlas/zeroth-js/tree/master/example/zeroth-base))

```js
const params = {
  // appId, appSecret or accessToken
  language: 'kor', // required. you can choose 'eng' for English or 'kor' for Korean
  finalOnly: false, // optional(default: false) if this is 'true', You will get only final results.
  ws: false, // optional(default: false) we are using websocket secure (wss). if this is true, we will use 'ws' instead of 'wss'
  debug: true // optional(default: false) if this is 'true', You will get all logs from zeroth.
};

zeroth = new ZerothBase(params);

// initialize Zeroth
zeroth.init();

zeroth.onconnect = () => {
  // connected to zeroth
  // start audio recording or prepare to send audio file
};

zeroth.ondata = data => {
  // transcript in JSON
};

zeroth.ondisconnect = () => {
  // disconnected from zeroth
};

zeroth.onerror = error => {
  // error from zeroth
};

// send binary audio data
zeroth.send(data);

// disconnect (always call this after sending complete audio data)
zeroth.disconnect();
```

## ZerothMic

> It's extend of ZerothBase with microphone recording function.<br/>You can use real-time STT easily.

It support browser which support [getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia), [AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext),
[OfflineAudioContext](https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioContext).
You can check caniuse [here](https://caniuse.com/#search=Web%20Audio%20API).

([Example](https://github.com/goodatlas/zeroth-js/tree/master/example/zeroth-mic))

```js
const params = {
  // appId, appSecret or accessToken
  language: 'kor', // required. you can choose 'eng' for English or 'kor' for Korean
  finalOnly: false, // optional(default: false) if this is 'true', You will get only final results.
  ws: false, // optional(default: false) we are using websocket secure (wss). if this is true, we will use 'ws' instead of 'wss'
  debug: true // optional(default: false) if this is 'true', You will get all logs from zeroth.
};

zeroth = new ZerothMic(params);

zeroth
  .start() // try to start recording
  .then(() => {
    console.log('Successfully initialized recording');
    // what you want to do after initialize recording
  })
  .catch(() => {
    console.log("Your browser doesn't support recording");
    // what you want to do after failed to initialize recording
  });

zeroth.onconnect = () => {
  // connected to zeroth
};

zeroth.ondata = data => {
  // transcript in JSON
};

zeroth.ondisconnect = () => {
  // disconnected from zeroth
};

zeroth.onerror = error => {
  // error from zeroth
};

// stop recording (it will stop recording and call zeroth.disconnect() )
zeroth.stop();
```

### Are you working in none `https` enviroment?

`ZerothMic` using `getUserMedia()` to use microphone. And, `getUserMedia()` is works on only `https` enviroment (and `localhost`).

### Did you get `audio permission asking popup` at every `.start()`?

Same with above, `getUserMedia()` is works on only `https` enviroment (and `localhost`). and In localhost, Your browser will ask for permission at every `.start()` function.<br/>**But don't be worry, In `https`, it shows only once.**

## ZerothFile (Working in progress)

> It's extend of ZerothBase with sending file function.<br/>You can transcribed text via sending audio file to zeroth.

You must send audio file. if you are using `<input type="file">` tag, you can add `accept="audio/*"` attribute.

It support browser which support [AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext),
[OfflineAudioContext](https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioContext).
You can check caniuse [here](https://caniuse.com/#search=Web%20Audio%20API).

([Example](https://github.com/goodatlas/zeroth-js/tree/master/example/zeroth-file))

```js
const params = {
    // appId, appSecret or accessToken
    language: 'kor', // required. you can choose 'eng' for English or 'kor' for Korean
    finalOnly: false, // optional(default: false) if this is 'true', you will get only final results.
    ws: false, // optional(default: false) we are using websocket secure (wss). if this is true, we will use 'ws' instead of 'wss'
    debug: true, // optional(default: false) if this is 'true', You will get all logs from zeroth.
    file: { YOUR FILE } // required. your file to send. (Javascript File Object)
}

// initialize zeroth and send file to zeroth
zeroth = new ZerothFile(params);

zeroth.ondata = data => {
  // transcript in JSON
};

zeroth.ondisconnect = () => {
  // disconnected from zeroth
};

zeroth.onerror = error => {
  // error from zeroth
};

// it disconnect automatically
```

# Example

Check out `example` folder for a sample web app to send audio file and audio record stream (using Web Audio APIs).

* [ZerothBase](https://github.com/goodatlas/zeroth-js/tree/master/example/zeroth-base)
* [ZerothMic](https://github.com/goodatlas/zeroth-js/tree/master/example/zeroth-mic)
* [ZerothFile](https://github.com/goodatlas/zeroth-js/tree/master/example/zeroth-file)

# Development

Build

```
npm run build
```
