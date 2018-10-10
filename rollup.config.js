import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import webworkify from 'rollup-plugin-webworkify';

export default [
  {
    input: 'src/index.js',
    plugins: [
      webworkify({
        pattern: '**/*.worker.js'
      }),
      babel({
        exclude: 'node_modules/**',
        babelrc: false,
        presets: [['env', { modules: false }]],
        plugins: ['transform-class-properties']
      }),
      resolve(),
      commonjs({
        namedExports: {
          'node_modules/webworkify-webpack/index.js': ['work']
        }
      })
    ],
    output: [
      {
        file: 'dist/zeroth.cjs.js',
        format: 'cjs',
        name: 'Zeroth'
      },
      {
        file: 'dist/zeroth.umd.js',
        name: 'Zeroth',
        format: 'umd'
      },
      {
        file: 'dist/zeroth.iife.js',
        format: 'iife',
        name: 'Zeroth'
      }
    ]
  },
  {
    input: 'src/index.js',
    plugins: [
      webworkify({
        pattern: '**/*.worker.js'
      }),
      babel({
        exclude: 'node_modules/**',
        babelrc: false,
        presets: [['env', { modules: false }]],
        plugins: ['transform-class-properties']
      }),
      resolve()
    ],
    external: ['webworkify-webpack'],
    output: [
      {
        file: 'dist/zeroth.amd.js',
        format: 'amd',
        name: 'Zeroth'
      },
      {
        file: 'dist/zeroth.mjs',
        format: 'es'
      }
    ]
  }
];
