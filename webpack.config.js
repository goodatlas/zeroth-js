const path = require('path');

function createConfig(target) {
  let filePrefix = target === 'var' ? 'min' : target;
  return {
    mode: 'production',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'zeroth.' + filePrefix + '.js',
      library: 'Zeroth',
      libraryTarget: target
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ]
    }
  };
}

module.exports = [
  createConfig('var'),
  createConfig('commonjs2'),
  createConfig('amd'),
  createConfig('umd')
];
