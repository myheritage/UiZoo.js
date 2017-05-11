'use strict';
let fs = require('fs'),
  alias = require('rollup-plugin-alias'),
  postcss = require('postcss'),
  babel = require('rollup-plugin-babel'),
  nodeResolve = require('rollup-plugin-node-resolve'),
  commonjs = require('rollup-plugin-commonjs'),
  scss = require('rollup-plugin-scss'),
  //post CSS plugins:
  comments = require('postcss-discard-comments'),
  dupes = require('postcss-discard-duplicates'),
  cssnext = require('postcss-cssnext'),
  replace = require("rollup-plugin-replace");

import multiEntry from 'rollup-plugin-multi-entry';

/**
 * @param entryGlob The entries for the library
 * @param cssDestDir The output dir for the css
 */
export function createConfig(entryFile, entryGlob, destDir) {
  return {
    entry: entryFile,
    plugins: [
      scss({
        output(styles, styleNodes) {
          postcss([cssnext, comments, dupes])
        }
      }),
      babel({
        presets: [
          "es2015-rollup",
          "react"
        ],
        exclude: "./node_modules/**/*",
      }),
      nodeResolve({ browser: true, jsnext: true, main: true }),
      commonjs(),
      replace({
        'process.env.NODE_ENV': JSON.stringify('development')
      })
    ],
    sourceMap: true,
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  };
}