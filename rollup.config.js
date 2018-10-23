import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import webworkify from 'rollup-plugin-webworkify';
import { uglify } from 'rollup-plugin-uglify';
import optimizeJs from 'rollup-plugin-optimize-js';
import pkg from './package.json';

export default [
  {
    input: 'src/config.js',
    output: {
      name: 'Zeroth',
      file: pkg.browser,
      format: 'umd'
    },
    plugins: [
      resolve(),
      babel({
        runtimeHelpers: true,
        sourceMap: true,
        exclude: 'node_modules/**',
        include: 'src/base.worker.js'
      }),
      webworkify(),
      commonjs(),
      uglify({
        compress: {
          negate_iife: false
        }
      }),
      optimizeJs()
    ]
  },
  {
    input: 'src/index.js',
    plugins: [
      babel({
        runtimeHelpers: true,
        sourceMap: true,
        exclude: 'node_modules/**',
        include: 'src/**'
      }),
      webworkify()
    ],
    external: [
      '@babel/runtime/helpers/classCallCheck',
      '@babel/runtime/helpers/possibleConstructorReturn',
      '@babel/runtime/helpers/getPrototypeOf',
      '@babel/runtime/helpers/inherits',
      '@babel/runtime/helpers/assertThisInitialized',
      '@babel/runtime/helpers/createClass'
    ],
    output: [{ file: pkg.main, format: 'cjs' }, { file: pkg.module, format: 'es' }]
  }
];
