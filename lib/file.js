import ZerothBase from './base.js';

export default class ZerothFile extends ZerothBase {
  constructor(params) {
    super(params);
    this.init(params);
    this.file = params.file;
    // If safari, using 44100 instead of 16000
    this.sampleRate = window.OfflineAudioContext ? 16000 : 44100;
  }

  sendFile = () => {
    const file = document.getElementById('audiofile').files[0];
    const reader = new FileReader();
    reader.onload = e => {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const buf = e.target.result;
      audioCtx.decodeAudioData(buf).then(audioBuffer => {
        this.resample(audioBuffer, this.sampleRate, buffer => {
          const left = buffer.getChannelData(0);
          const buf = this.convertFloat32ToInt16(left);
          zeroth.send(buf);
          zeroth.disconnect();
        });
      });
    };
    reader.readAsArrayBuffer(file);
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

  onready = () => {
    this.sendFile(this.file);
  };
}
