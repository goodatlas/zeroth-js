if (!process.env.API_KEY) {
  throw Error('You Should add API_KEY for test! try like this `API_KEY=yourkeyhere npm run test`');
}

module.exports = {
  preset: 'jest-puppeteer',
  globals: {
    PATH: 'http://localhost:4444',
    KEY: process.env.API_KEY
  },
  testMatch: ['**/test/**/*.test.js']
};
