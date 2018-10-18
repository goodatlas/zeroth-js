describe('ZerothFile', () => {
  beforeEach(async () => {
    await page.goto(PATH);
  });
  it(
    'Should return result after send file',
    async done => {
      function consoleCheck(msg) {
        if (msg.text() === 'got data') {
          check(msg.text());
        }
      }
      function check(err) {
        expect(err).toMatch('got data');
        page.removeListener('console', consoleCheck);
        done();
      }

      page.on('console', consoleCheck);

      const input = await page.$('#file');
      input.uploadFile('./zeroth-file-test.m4a');

      await page.evaluate(key => {
        const file = new Zeroth.ZerothMic({
          key,
          language: 'kor',
          debug: true,
          file: document.getElementById('file').files[0]
        });
        file.ondata = () => {
          console.log('got data');
        };
      }, KEY);
    },
    50000
  );

  // if files is not audio
  // message
});
