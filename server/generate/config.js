const path = require('path');

const appFolderPath = path.resolve('uizoo-app');
const uiZooScript = `node ${path.join('uizoo-app', 'webpack.uizoo.js')}`;

const neededPackages = [
    'uizoo',
    'webpack',
    'webpack-dev-server',
    'babel-loader',
    'babel-preset-env',
    'babel-preset-react',
    'babel-plugin-transform-object-rest-spread',
    'babel-plugin-syntax-dynamic-import',
    'style-loader',
    'css-loader',
    'fs-extra'
];

const templatesToCopy = [
    'index.html',
    'index.js',
    'webpack.uizoo.js',
    'createConfigsScript.js',
    'componentsContainer.js',
    'documentationContainer.js',
    'config.js',
];

const log = console.log.bind(console);

module.exports = {
    appFolderPath,
    uiZooScript,
    neededPackages,
    templatesToCopy,
    log
};