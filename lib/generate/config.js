const path = require('path');

const appFolderPath = path.resolve('.uizoo-app');
const uiZooScript = `node ${path.join('.uizoo-app', 'webpack.uizoo.js')}`;

const neededPackages = [
    'uizoo',
    'webpack',
    'webpack-dev-server',
    'babel-loader',
    'babel-preset-env',
    'babel-preset-react',
    'babel-plugin-transform-object-rest-spread',
    'babel-plugin-syntax-dynamic-import',
    'babel-plugin-transform-flow-strip-types',
    'style-loader',
    'css-loader',
    'uizoo-app',
];

const templatesToCopy = [
    'index.html',
    'index.js',
    'webpack.uizoo.js',
    'componentsContainer.js',
    'documentationContainer.js',
    'config.js',
];

const log = console.log.bind(console);

const localPort = 5005; // don't forget it's in the template's config as well

module.exports = {
    appFolderPath,
    uiZooScript,
    neededPackages,
    templatesToCopy,
    log,
    localPort
};