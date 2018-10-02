# zeroth-js

zeroth-js is a browser-based JavaScript client library for [Zeroth ASR](https://github.com/goodatlas/zeroth).

## Installation

### NPM

```
npm install goodatlas/zeroth-js
```

Using this method, you can `import` zeroth-js like:

```js
import Zeroth from "zeroth-js";
```

### CDN

Include the js file directly in your web app using a &lt;script&gt; tag.

```html
<script src="https://somecdn/zeroth.min.js"></script>
```

## Usage

```js
const params = {
  key: 'ZEROTH_API_KEY', // required
  language: 'eng', // 'eng' or 'kor', default 'eng'
  finalOnly: false // optional, default false
};

zeroth = new Zeroth(params);

zeroth.onconnect = () => {
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

## Example

Check out `example` folder for a sample web app to send audio file and audio record stream (using Web Audio APIs).

## Development

Build
```
npm run build
```
