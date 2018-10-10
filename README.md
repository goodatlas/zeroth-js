# zeroth-js

zeroth-js is a browser-based JavaScript client library for [Zeroth ASR](https://github.com/goodatlas/zeroth).

---
- [ZerothBase](#zerothbase)
  - Just help you to connect with Zeroth.
  - You should implement functions such as recording stuffs, sending file stuffs. 
  - But You can customize yourself.


- [ZerothMic](#zerothmic)
  - It's extend of ZerothBase with microphone recording function.
  - You can use real-time STT easily.

- [ZerothFile](#zerothfile)
  - It's extend of ZerothBase with sending file function.
  - You can transcribed text via sending audio file to zeroth.

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

# Usage
## ZerothBase
> Just help you to connect with Zeroth.<br/>You should implement functions such as recording stuffs, sending file stuffs.<br/>But You can customize yourself.
```js
const params = {
    key: 'YOUR_API_KEY', // required. you can get your api key in dashboard.
    language: 'kor', // required. you can choose 'eng' for English or 'kor' for Korean
    finalOnly: false, // optional(default: false) if this is 'true', You will get only final results.
    ws: false, // optional(default: false) we are using websocket secure (wss). if this is true, we will use 'ws' instead of 'wss'
    debug: true // optional(default: false) if this is 'true', You will get all logs from zeroth.
}

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
```js
const params = {
    key: 'YOUR_API_KEY', // required. you can get your api key in dashboard.
    language: 'kor', // required. you can choose 'eng' for English or 'kor' for Korean
    finalOnly: false, // optional(default: false) if this is 'true', You will get only final results.
    ws: false, // optional(default: false) we are using websocket secure (wss). if this is true, we will use 'ws' instead of 'wss'
    debug: true // optional(default: false) if this is 'true', You will get all logs from zeroth.
}

zeroth = new ZerothMic(params);

// initialize Zeroth
zeroth.initRecording()
    .then(() => {
        console.log('Successfully initialized recording');
        // what you want to do after initialize recording
    })
    .catch(() => {
        console.log('Your browser doesn\'t support recording');
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
zeroth.stopRecording();
```

## ZerothFile
>It's extend of ZerothBase with sending file function.<br/>You can transcribed text via sending audio file to zeroth.

You must send audio file. if you are using `<input type="file">` tag, you can add `accept="audio/*"` attribute.

```js
const params = {
    key: 'YOUR_API_KEY', // required. you can get your api key in dashboard.
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

# Development

Build
```
npm run build
```
