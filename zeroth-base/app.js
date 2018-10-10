'use strict';

const sampleRate = 16000;
const bufferSize = 2048;
const channels = 1;

let zeroth = null;
let context = null;

const start = document.querySelector('.start');
const stop = document.querySelector('.stop');
const transcript = document.querySelector('.transcript');
const json = document.querySelector('.json');
const file = document.querySelector('.file');

stop.disabled = true;

const { ZerothBase } = Zeroth;
const init = () => {
  if (!navigator.mediaDevices.getUserMedia) {
    start.disabled = true;
    transcript.textContent = 'getUserMedia not supported on your browser!';
    return;
  }

  const constraints = { audio: true, video: false };
  navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
};

const onSuccess = stream => {
  start.onclick = () => {
    const params = {
      key: 'YOUR_API_KEY',
      language: 'kor',
      // finalOnly: true,
      debug: true
    };

    zeroth = new ZerothBase(params);
    zeroth.init(params);

    zeroth.onconnect = () => {
      startRecording(stream);
    };

    zeroth.ondata = data => {
      transcript.textContent = data.transcript;
      json.textContent = JSON.stringify(data);
    };

    zeroth.ondisconnect = () => {
      stopRecording();
    };

    zeroth.onerror = error => {
      transcript.textContent = 'zeroth error: ' + error;
      stopRecording();
    };
  };

  stop.onclick = () => {
    stopRecording();
  };

  file.onclick = () => {
    const params = {
      key: 'YOUR_API_KEY',
      language: 'kor',
      // finalOnly: true,
      debug: true
    };

    zeroth = new ZerothBase(params);
    zeroth.init(params);

    zeroth.onconnect = () => {
      sendFile();
    };

    zeroth.ondata = data => {
      transcript.textContent = data.transcript;
      json.textContent = JSON.stringify(data);
    };

    zeroth.onerror = error => {
      transcript.textContent = 'zeroth error: ' + error;
    };
  };
};

const onError = err => {
  transcript.textContent = 'getUserMedia error: ' + err;
};

const startRecording = stream => {
  context = new AudioContext();
  const source = context.createMediaStreamSource(stream);
  const processor = context.createScriptProcessor(bufferSize, channels, channels);
  source.connect(processor);
  processor.connect(context.destination);
  processor.onaudioprocess = onAudioProcess;
  start.disabled = true;
  stop.disabled = false;
};

const stopRecording = () => {
  if (context && context.state !== 'closed') context.close();
  zeroth.disconnect();
  start.disabled = false;
  stop.disabled = true;
};

const onAudioProcess = e => {
  resample(e.inputBuffer, sampleRate, buffer => {
    const left = buffer.getChannelData(0);
    const buf = convertFloat32ToInt16(left);
    zeroth.send(buf);
  });
};

const resample = (audioBuffer, targetSampleRate, onComplete) => {
  const channels = audioBuffer.numberOfChannels;
  const samples = audioBuffer.length * targetSampleRate / audioBuffer.sampleRate;
  const offlineContext = new OfflineAudioContext(channels, samples, targetSampleRate);
  const bufferSource = offlineContext.createBufferSource();
  bufferSource.buffer = audioBuffer;
  bufferSource.connect(offlineContext.destination);
  bufferSource.start(0);
  offlineContext.startRendering().then(renderedBuffer => {
    onComplete(renderedBuffer);
  });
};

const convertFloat32ToInt16 = buffer => {
  let l = buffer.length;
  let buf = new Int16Array(l);
  while (l--) {
    buf[l] = Math.min(1, buffer[l]) * 0x7fff;
  }
  return buf;
};

const sendFile = () => {
  const file = document.getElementById('audiofile').files[0];
  const reader = new FileReader();
  reader.onload = e => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const buf = e.target.result;
    audioCtx.decodeAudioData(buf).then(audioBuffer => {
      resample(audioBuffer, sampleRate, buffer => {
        const left = buffer.getChannelData(0);
        const buf = convertFloat32ToInt16(left);
        zeroth.send(buf);
      });
    });
  };
  reader.readAsArrayBuffer(file);
};

init();
