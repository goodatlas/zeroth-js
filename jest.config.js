module.exports = {
  preset: 'jest-puppeteer',
  globals: {
    PATH: 'http://localhost:4444',
    KEY: process.env.API_KEY
  },
  testMatch: ['**/test/**/*.test.js']
};
