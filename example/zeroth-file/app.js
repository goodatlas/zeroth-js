'use strict';

let zeroth = null;
let context = null;

const key = document.querySelector('#key');
const transcript = document.querySelector('.transcript');
const confidence = document.querySelector('.confidence');
const json = document.querySelector('.json');
const file = document.querySelector('.file');

stop.disabled = true;

const { ZerothFile } = Zeroth;

file.onclick = () => {
  const params = {
    key: key.value,
    language: 'kor',
    // finalOnly: true,
    debug: true,
    file: document.getElementById('audiofile').files[0]
  };

  zeroth = new ZerothFile(params);

  zeroth.ondata = data => {
    transcript.textContent = data.transcript;
    if (data.final) {
      confidence.innerHTML = data['word-alignment']
        .map(
          result =>
            `<span style="opacity: ${result.confidence}; font-weight:bold">${result.word}</span>`
        )
        .join(' ');
    }
    json.textContent = JSON.stringify(data);
  };

  zeroth.onerror = error => {
    transcript.textContent = 'zeroth error: ' + error;
  };
};
