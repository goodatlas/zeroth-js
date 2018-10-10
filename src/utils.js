export const CrossAudioContext = window.AudioContext || window.webkitAudioContext;

// export const resample = (audioBuffer, targetSampleRate, onComplete) => {
//   const channels = audioBuffer.numberOfChannels;
//   const samples = audioBuffer.length * targetSampleRate / audioBuffer.sampleRate;
//   const offlineContext = new CrossOfflineAudioContext(channels, samples, targetSampleRate);
//   const bufferSource = offlineContext.createBufferSource();
//   bufferSource.buffer = audioBuffer;
//   bufferSource.connect(offlineContext.destination);
//   bufferSource.start(0);
//   offlineContext.oncomplete = e => onComplete(e.renderedBuffer);
//   offlineContext.startRendering();
// };

export const convertFloat32ToInt16 = buffer => {
  let l = buffer.length;
  let buf = new Int16Array(l);
  while (l--) {
    buf[l] = Math.min(1, buffer[l]) * 0x7fff;
  }
  return buf;
};
