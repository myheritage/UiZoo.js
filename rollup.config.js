'use strict';
let fs = require('fs'),
  alias =  require('rollup-plugin-alias'),
  postcss =  require('postcss'),
  babel = require('rollup-plugin-babel'),
  nodeResolve =  require('rollup-plugin-node-resolve'),
  commonjs =  require('rollup-plugin-commonjs'),
  scss =  require('rollup-plugin-scss'),
  //post CSS plugins:
  comments = require('postcss-discard-comments'),
  dupes = require('postcss-discard-duplicates'),
  cssnext = require('postcss-cssnext');

module.exports = {
  entry: 'src/client/index.js',
  external: ['react', 'react-dom'],
  plugins: [
    scss({
      output(styles, styleNodes) {
        postcss([cssnext, comments, dupes])
          .process(styles)
              .then(result => {
                  fs.writeFile('build/index.css', result.css);
              });
      }
    }),
    babel({
      exclude: ['node_modules/**']
    }),
    nodeResolve({ browser: true, jsnext: true, main: true, skip: ['react', 'react-dom'] }),
    commonjs(),
  ],
  sourceMap: true,
};