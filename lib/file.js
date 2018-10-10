import ZerothBase from './base.js';
import { CrossAudioContext, convertFloat32ToInt16 } from './utils.js';
import config from './config';

export default class ZerothFile extends ZerothBase {
  constructor(params) {
    super(params);
    this.init(params);
    this.file = params.file;
    if (this.file === undefined) {
      throw Error('Parameter `file` is required.');
    }

    if (!/^audio/.test(this.file.type)) {
      throw Error(`Expected Audio file but got ${this.file.type} file.`);
    }
    this.sampleRate = config.sampleRate;
  }

  sendFile = () => {
    const file = this.file;
    const reader = new FileReader();
    reader.onload = e => {
      const audioCtx = new CrossAudioContext();
      const buf = e.target.result;
      audioCtx.decodeAudioData(buf, audioBuffer => {
        const left = audioBuffer.getChannelData(0);
        const buf = convertFloat32ToInt16(left);
        zeroth.send(buf);
        zeroth.disconnect();
      });
    };
    reader.readAsArrayBuffer(file);
  };

  onready = () => {
    this.sendFile(this.file);
  };
}
