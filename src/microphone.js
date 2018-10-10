import ZerothBase from './base.js';
import { CrossAudioContext, convertFloat32ToInt16 } from './utils.js';
import config from './config';

let debug = () => {};

export default class ZerothMic extends ZerothBase {
  constructor(params) {
    super(params);
    this.params = params;
    this.stream = null;
    this.bufferSize = 2048;
    this.channels = 1;
    this.sampleRate = config.sampleRate;
    if (params.debug) {
      debug = (...args) => console.log('[zerothjs:debug]', ...args);
    }
    this.params = params;
  }

  // eslint-disable-next-line prettier/prettier
  start = () =>
    new Promise((resolve, reject) => {
      const onSuccess = stream => {
        debug('Successfully got UserMedia');
        this.stream = stream;
        this.recording();
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

  recording = () => {
    this.init(this.params);
    this.onready = () => {
      const { bufferSize, channels, stream } = this;
      this.context = new CrossAudioContext();
      const source = this.context.createMediaStreamSource(stream);
      const processor = this.context.createScriptProcessor(bufferSize, channels, channels);
      source.connect(processor);
      processor.connect(this.context.destination);
      processor.onaudioprocess = this.onAudioProcess;
    };
  };

  onAudioProcess = e => {
    const left = e.inputBuffer.getChannelData(0);
    const buf = convertFloat32ToInt16(left);
    this.send(buf);
  };

  stop = () => {
    if (this.context && this.context.state !== 'closed') this.context.close();
    const tracks = this.stream.getTracks();
    tracks.forEach(track => {
      track.stop();
    });
    this.disconnect();
  };
}
