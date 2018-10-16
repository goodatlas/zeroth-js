describe('ZerothBase', () => {
  beforeAll(async () => {
    await page.goto(PATH);
  });

  it('Should throw error if parameter is empty', async () => {
    try {
      await page.evaluate(() => new Zeroth.ZerothBase());
    } catch (e) {
      expect(e.message).toEqual(expect.stringMatching('Missing parameter'));
    }
    expect.assertions(1);
  });

  it('Should throw error if required parameter `key` is empty', async done => {
    function check(err) {
      expect(err).toMatch('API key missing');
      done();
    }

    page.once('console', message => {
      check(message.text());
    });

    await page.evaluate(() => {
      const base = new Zeroth.ZerothBase({});
      base.init();
      base.onerror = e => {
        console.log(e);
      };
      base.init();
    });
  });

  // connect
  // event handlers
  // message
  // ...
});
