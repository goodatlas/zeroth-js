const start = document.querySelector('.start');
const stop = document.querySelector('.stop');
const transcript = document.querySelector('.transcript');
const confidence = document.querySelector('.confidence');
const json = document.querySelector('.json');
stop.disabled = true;

let zeroth = null;
const onError = err => {
  transcript.textContent = 'getUserMedia error: ' + err;
};

const onSuccess = () => {
  zeroth.onconnect = () => {
    stop.disabled = false;
  };

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

  zeroth.ondisconnect = () => {
    start.disabled = false;
  };

  zeroth.onerror = error => {
    transcript.textContent = 'zeroth error: ' + error;
    zeroth.stop();
  };
};

start.onclick = () => {
  const params = {
    appId: document.querySelector('#appId').value,
    appSecret: document.querySelector('#appSecret').value,
    language: document.querySelector('input[name="language"]:checked').value,
    finalOnly: document.querySelector('#finalOnly').checked,
    ws: document.querySelector('#ws').checked,
    debug: document.querySelector('#debug').checked
  };

  zeroth = new Zeroth.ZerothMic(params);
  zeroth
    .start()
    .then(onSuccess)
    .catch(onError);
  start.disabled = true;
};

stop.onclick = () => {
  zeroth.stop();
  stop.disabled = true;
};
