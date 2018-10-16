const webpack = require('webpack');
const express = require('express');
const compiler = webpack(require('../webpack.config'));
const isObject = require('is-object');
const middleware = require('webpack-dev-middleware');
const app = express();

// This function makes server rendering of asset references consistent with different webpack chunk/entry configurations
function normalizeAssets(assets) {
  if (isObject(assets)) {
    return Object.values(assets);
  }
  return Array.isArray(assets) ? assets : [assets];
}

app.use(middleware(compiler, { serverSideRender: true }));

// The following middleware would not be invoked until the latest build is finished.
app.use((req, res) => {
  const assetsByChunkName = res.locals.webpackStats.toJson().children[3].assetsByChunkName;
  const fs = res.locals.fs;
  const outputPath = res.locals.webpackStats.toJson().children[3].outputPath;
  // then use `assetsByChunkName` for server-sider rendering
  // For example, if you have only one main chunk:
  res.send(`
<html>
  <head>
    <title>Zeroth Test</title>
  </head>
  <body>
      <p>
        <button class='start'>start</button>
        <button class='stop'>stop</button>
      </p>
  <script>
  ${normalizeAssets(assetsByChunkName.main)
    .filter(path => path.endsWith('.js'))
    .map(path => fs.readFileSync(outputPath + '/' + path))
    .join('\n')}
  </script>
  </body>
</html>
  `);
});

let port = 4444;
const index = Math.max(process.argv.indexOf('--port'), process.argv.indexOf('-p'));
if (index !== -1) {
  port = +process.argv[index + 1] || port;
}
app.listen(port);
console.log(`Server started at http://localhost:${port}/`);
