// jest-puppeteer.config.js
module.exports = {
  server: {
    command: 'node test/server.js',
    port: 4444
  },
  launch: {
    args: ['--use-fake-ui-for-media-stream']
  }
};
