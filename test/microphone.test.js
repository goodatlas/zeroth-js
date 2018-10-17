describe('ZerothMic', () => {
  beforeEach(async () => {
    await page.goto(PATH);
  });
  it('Should get Media permission when call `start()`', async done => {
    function check(err) {
      expect(err).toMatch('[zerothjs:debug] Successfully got UserMedia');
      done();
    }

    page.once('console', message => {
      check(message.text());
    });

    await page.evaluate(key => {
      const mic = new Zeroth.ZerothMic({ key, language: 'kor', debug: true });
      mic.onconnect = () => {
        mic.stop();
      };
      mic
        .start()
        .then(() => {
          console.log('Success to get media');
        })
        .catch(e => {
          console.log(e);
        });
    }, KEY);
  });

  it(
    'Should return result',
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

      await page.evaluate(key => {
        const mic = new Zeroth.ZerothMic({ key, language: 'kor', debug: true });
        mic.ondata = () => {
          console.log('got data');
          mic.stop();
        };
        mic.ondisconnect = e => {
          console.warn('disconnect:', e);
        };
        mic.onerror = e => {
          console.warn('error:', e);
        };
        mic.onconnnect = () => {
          console.warn('connected');
        };
        mic
          .start()
          .then(() => {
            console.warn('Success to get media');
          })
          .catch(e => {
            console.warn(e);
          });
      }, KEY);
    },
    50000
  );

  // if not media browser
  // message
});
