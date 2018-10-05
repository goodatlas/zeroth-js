import ZerothBase from './base.js';

export default class ZerothFile extends ZerothBase {
  constructor(params) {
    super(params);
    this.init(params);
    this.file = params.file;
  }

  sendFile = file => {
    const reader = new FileReader();
    reader.onload = e => {
      const buf = e.target.result;
      this.send(buf);
      this.disconnect();
    };
    reader.readAsArrayBuffer(file);
  };

  onreday = () => {
    this.sendFile(this.file);
  };
}
