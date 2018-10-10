import ZerothBase from './base.js';

let debug = () => {};

export default class ZerothMic extends ZerothBase {
  constructor(params) {
    super(params);
    this.params = params;
    this.stream = null;
    this.bufferSize = 2048;
    this.channels = 1;
    this.sampleRate = window.OfflineAudioContext ? 16000 : 44100;
    if (params.debug) {
      debug = (...args) => console.log('[zerothjs:debug]', ...args);
    }
  }

  // eslint-disable-next-line prettier/prettier
  initRecording = () =>
    new Promise((resolve, reject) => {
      const onSuccess = stream => {
        debug('Successfully got UserMedia');
        this.stream = stream;
        resolve();
      };
      const onError = err => reject(err);
      const constraints = {
        audio: true,
        video: false
      };

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        const getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        if (!getUserMedia) {
          debug("Couldn't found getUserMedia on your browser.");
          reject(new Error("Your browser dosen't support Media"));
          return;
        }
        getUserMedia(constraints).then(onSuccess, onError);
      } else {
        navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
      }
    });

  startRecording = () => {
    this.init(this.params);
    this.onready = () => {
      const { bufferSize, channels, stream } = this;
      this.context = new (window.AudioContext || window.webkitAudioContext)();
      const source = this.context.createMediaStreamSource(stream);
      const processor = this.context.createScriptProcessor(bufferSize, channels, channels);
      source.connect(processor);
      processor.connect(this.context.destination);
      processor.onaudioprocess = this.onAudioProcess;
    };
  };

  onAudioProcess = e => {
    this.resample(e.inputBuffer, this.sampleRate, buffer => {
      const left = buffer.getChannelData(0);
      const buf = this.convertFloat32ToInt16(left);
      this.send(buf);
    });
  };

  resample = (audioBuffer, targetSampleRate, onComplete) => {
    const offlineAudioContext = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    const channels = audioBuffer.numberOfChannels;
    const samples = audioBuffer.length * targetSampleRate / audioBuffer.sampleRate;
    const offlineContext = new offlineAudioContext(channels, samples, this.sampleRate);
    const bufferSource = offlineContext.createBufferSource();
    bufferSource.buffer = audioBuffer;
    bufferSource.connect(offlineContext.destination);
    bufferSource.start(0);
    offlineContext.oncomplete = e => onComplete(e.renderedBuffer);
    offlineContext.startRendering();
  };

  convertFloat32ToInt16 = buffer => {
    let l = buffer.length;
    let buf = new Int16Array(l);
    while (l--) {
      buf[l] = Math.min(1, buffer[l]) * 0x7fff;
    }
    return buf;
  };

  stopRecording = () => {
    if (this.context && this.context.state !== 'closed') this.context.close();
    this.disconnect();
  };
}
