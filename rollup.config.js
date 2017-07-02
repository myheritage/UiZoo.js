'use strict';

let fs = require('fs'),
  json = require('rollup-plugin-json'),
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

const defaultExternal = [];

function getPlugins({
  external
}, withScss = true) {
  const scssPlugins = [scss({
      output(styles, styleNodes) {
        postcss([cssnext, comments, dupes])
          .process(styles)
          .then(result => {
            fs.writeFile('./dist/index.css', result.css);
          });
      }
    })];
  const defaultPlugins = [
    json(),
    babel({
      presets: [
        "es2015-rollup", "react"
      ],
      exclude: "./node_modules/**/*"
    }),

    nodeResolve({
      browser: true,
      jsnext: true,
      main: true,
      skip: defaultExternal.concat(external)
    }),
    commonjs(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ];

  return withScss
    ? scssPlugins.concat(defaultPlugins)
    : defaultPlugins;
}

function getConfig({
  external = [],
  entry = 'client/index.js'
}, withScss = true) {
  return {
    entry,
    external: defaultExternal.concat(external),
    plugins: getPlugins({external}, withScss),
  };
}

module.exports = getConfig;