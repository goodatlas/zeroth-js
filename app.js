'use strict';

const sampleRate = 16000;
const bufferSize = 2048;
const channels = 1;

let zeroth = null;
let context = null;

const start = document.querySelector('.start');
const stop = document.querySelector('.stop');
const result = document.querySelector('.result');

stop.disabled = true;

const init = () => {
  if (!navigator.mediaDevices.getUserMedia) {
    start.disabled = true;
    result.textContent = 'getUserMedia not supported on your browser!';
    return;
  }

  const constraints = { audio: true, video: false };
  navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
};

const onSuccess = stream => {
  start.onclick = () => {
    const params = { apiKey: 'ZEROTH_API_KEY', debug: true };
    zeroth = new Zeroth(params);

    zeroth.onconnect = () => {
      startRecording(stream);
    };

    zeroth.ondata = data => {
      result.textContent = data;
    };

    zeroth.ondisconnect = () => {
      stopRecording();
    };

    zeroth.onerror = error => {
      result.textContent = 'zeroth error: ' + error;
      stopRecording();
    };
  };

  stop.onclick = () => {
    stopRecording();
  };
};

const onError = err => {
  result.textContent = 'getUserMedia error: ' + err;
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
  // return buf.buffer;
  return buf;
};

init();
