import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import webworkify from 'rollup-plugin-webworkify';

export default [
  {
    input: 'src/index.js',
    plugins: [
      babel({
        exclude: 'node_modules/**',
        babelrc: false,
        presets: [['env', { modules: false }]],
        plugins: [
          'transform-class-properties',
          '@babel/plugin-syntax-dynamic-import',
          '@babel/transform-runtime'
        ],
        externalHelpers: false,
        runtimeHelpers: true
      }),
      webworkify({
        pattern: '**/*.worker.js'
      }),
      resolve(),
      commonjs({
        // namedExports: {
        //   'node_modules/@babel/runtime/helpers/classCallCheck': [
        //     '_classCallCheck'
        //   ],
        //   'node_modules/@babel/runtime/helpers/possibleConstructorReturn': [
        //     '_possibleConstructorReturn'
        //   ],
        //   'node_modules/@babel/runtime/helpers/inherits ': ['_inherits']
        // }
        include: 'node_modules/**'
      })
    ],
    external: [
      '@babel/runtime/helpers/classCallCheck',
      '@babel/runtime/helpers/possibleConstructorReturn',
      '@babel/runtime/helpers/inherits'
    ],
    output: [
      {
        file: 'dist/zeroth.cjs.js',
        format: 'cjs',
        name: 'Zeroth',
        globals: {
          '@babel/runtime/helpers/classCallCheck': '_classCallCheck',
          '@babel/runtime/helpers/possibleConstructorReturn': '_possibleConstructorReturn',
          '@babel/runtime/helpers/inherits': '_inherits'
        }
      },
      {
        file: 'dist/zeroth.umd.js',
        name: 'Zeroth',
        format: 'umd',
        globals: {
          '@babel/runtime/helpers/classCallCheck': '_classCallCheck',
          '@babel/runtime/helpers/possibleConstructorReturn': '_possibleConstructorReturn',
          '@babel/runtime/helpers/inherits': '_inherits'
        }
      },
      {
        file: 'dist/zeroth.iife.js',
        format: 'iife',
        name: 'Zeroth',
        globals: {
          '@babel/runtime/helpers/classCallCheck': '_classCallCheck',
          '@babel/runtime/helpers/possibleConstructorReturn': '_possibleConstructorReturn',
          '@babel/runtime/helpers/inherits': '_inherits'
        }
      }
    ]
  },
  {
    input: 'src/index.js',
    plugins: [
      babel({
        exclude: 'node_modules/**',
        babelrc: false,
        presets: [['env', { modules: false }]],
        plugins: [
          'transform-class-properties',
          '@babel/plugin-syntax-dynamic-import',
          '@babel/transform-runtime'
        ],
        externalHelpers: false,
        runtimeHelpers: true
      }),
      webworkify({
        pattern: '**/*.worker.js'
      }),
      resolve()
    ],
    external: [
      '@babel/runtime/helpers/classCallCheck',
      '@babel/runtime/helpers/possibleConstructorReturn',
      '@babel/runtime/helpers/inherits'
    ],
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
