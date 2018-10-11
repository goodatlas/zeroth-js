'use strict';

let zeroth = null;
let context = null;

const transcript = document.querySelector('.transcript');
const json = document.querySelector('.json');
const file = document.querySelector('.file');

stop.disabled = true;

const { ZerothFile } = Zeroth;

file.onclick = () => {
  const params = {
    key: 'YOUR_API_KEY',
    language: 'kor',
    // finalOnly: true,
    debug: true,
    file: document.getElementById('audiofile').files[0]
  };

  zeroth = new ZerothFile(params);

  zeroth.ondata = data => {
    transcript.textContent = data.transcript;
    json.textContent = JSON.stringify(data);
  };

  zeroth.onerror = error => {
    transcript.textContent = 'zeroth error: ' + error;
  };
};
