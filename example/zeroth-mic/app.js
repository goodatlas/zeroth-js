const start = document.querySelector('.start');
const stop = document.querySelector('.stop');
const transcript = document.querySelector('.transcript');
const json = document.querySelector('.json');
stop.disabled = true;

const params = {
  key: 'YOUR_API_KEY',
  language: 'kor',
  debug: true
};

const zeroth = new Zeroth.ZerothMic(params);

const onError = err => {
  transcript.textContent = 'getUserMedia error: ' + err;
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
    start.disabled = false;
    stop.disabled = true;
  };

  zeroth.onerror = error => {
    transcript.textContent = 'zeroth error: ' + error;
    zeroth.stopRecording();
  };

  start.onclick = () => {
    zeroth.startRecording();
  };

  stop.onclick = () => {
    zeroth.stopRecording();
  };
};

zeroth
  .initRecording()
  .then(onSuccess)
  .catch(onError);