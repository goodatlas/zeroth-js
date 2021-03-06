module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['@babel/preset-env'],
    plugins: [
      [
        '@babel/plugin-proposal-class-properties',
        {
          loose: true
        }
      ],
      '@babel/plugin-external-helpers',
      '@babel/plugin-transform-runtime'
    ]
  };
};
