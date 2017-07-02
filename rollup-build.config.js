const getRollupConfig = require('./rollup.config');

module.exports = getRollupConfig({external: ['underscore', 'react', 'react-dom', 'react-router-dom', 'doctrine-standalone', 'babel-standalone']});