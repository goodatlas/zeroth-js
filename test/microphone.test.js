if (!KEY) {
  throw Error('You Should add API_KEY for test! try like this `API_KEY=yourkeyhere npm run test`');
}

describe('ZerothMic', () => {
  beforeAll(async () => {
    await page.goto(PATH);
  });
  it('Should get Media permission when call `start()`', async done => {
    function check(err) {
      expect(err).toMatch('Success to get media');
      done();
    }

    page.once('console', message => {
      check(message.text());
    });

    await page.evaluate(key => {
      const mic = new Zeroth.ZerothMic({ key, language: 'kor' });
      mic
        .start()
        .then(() => console.log('Success to get media'))
        .catch(e => console.log(e));
    }, KEY);
  });

  // connect
  // event handlers
  // message
  // ...
});
