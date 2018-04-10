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
  apiKey: "ZEROTH_API_KEY"
};

zeroth = new Zeroth(params);

zeroth.onconnect = () => {
  // start audio recording
};

zeroth.ondata = data => {
  // data contains transcript
};

zeroth.ondisconnect = () => {
  // stop audio recording
};

zeroth.onerror = error => {
  // stop audio recording
};

// send binary audio data
zeroth.send(data);

// disconnect
zeroth.disconnect();
```

## Example

Check out `example` folder for a sample web app which uses Web Audio APIs for audio recording.

## Development

Build
```
npm run build
```
