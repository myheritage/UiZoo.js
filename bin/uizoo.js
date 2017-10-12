#!/usr/bin/env node

const chalk = require('chalk');
const logo = require('../lib/logo');
const log = console.log.bind(console);

log(`
Welcome to the ~
    ${chalk.bold(chalk.cyan(logo))}
`);

require('../lib/generate')();