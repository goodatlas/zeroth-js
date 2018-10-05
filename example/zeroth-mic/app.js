'use strict';

let zeroth = null;
let context = null;

const start = document.querySelector('.start');
const stop = document.querySelector('.stop');
const transcript = document.querySelector('.transcript');
const json = document.querySelector('.json');

stop.disabled = true;

const { ZerothMic } = Zeroth;

const init = () => {
  const params = {
    key: '0uLJcTO4GaUtSt3Ml66OFg4XhqKd1z80f5eeb12198421fb92bc102d6d34842',
    language: 'kor',
    // ws: true,
    debug: true
  };
  zeroth = new ZerothMic(params);
  zeroth
    .initRecording()
    .then(onSuccess)
    .catch(onError);
};

const onSuccess = () => {
  zeroth.onconnect = () => {
    start.disabled = true;
    stop.disabled = false;
  };

  zeroth.ondata = data => {
    transcript.textContent = data.transcript;
    json.textContent = JSON.stringify(data);
  };

  zeroth.ondisconnect = () => {
    zeroth.stopRecording();
  };

  zeroth.onerror = error => {
    transcript.textContent = 'zeroth error: ' + error;
    start.disabled = false;
    stop.disabled = true;
    zeroth.stopRecording();
  };

  start.onclick = () => {
    zeroth.startRecording();
  };

  stop.onclick = () => {
    start.disabled = false;
    stop.disabled = true;
    zeroth.stopRecording();
  };
};

const onError = err => {
  transcript.textContent = 'getUserMedia error: ' + err;
};

init();
