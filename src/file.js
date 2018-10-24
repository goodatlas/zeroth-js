import ZerothBase from './base.js';
import { CrossAudioContext, convertFloat32ToInt16 } from './utils.js';
import config from './config';

export default class ZerothFile extends ZerothBase {
  constructor(params) {
    super(params);
    this.file = params.file;
    if (this.file === undefined) {
      throw Error('Parameter `file` is required.');
    }

    if (!/^audio/.test(this.file.type)) {
      throw Error(`Expected Audio file but got ${this.file.type} file.`);
    }
    this.sampleRate = config.sampleRate;
    this.audioCtx = new CrossAudioContext();
    this.init(this.audioCtx.sampleRate);
  }

  sendFile = () => {
    const file = this.file;
    const reader = new FileReader();
    reader.onload = e => {
      const buf = e.target.result;
      this.audioCtx.decodeAudioData(buf, audioBuffer => {
        const left = audioBuffer.getChannelData(0);
        const buf = convertFloat32ToInt16(left);
        this.send(buf);
        this.disconnect();
      });
    };
    reader.readAsArrayBuffer(file);
  };

  onready = () => {
    this.sendFile(this.file);
  };
}
