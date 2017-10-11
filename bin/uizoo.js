#!/usr/bin/env node

const chalk = require('chalk');
const logo = require('../server/logo');
const log = console.log;

log(`
Welcome to the ~
    ${chalk.bold(chalk.cyan(logo))}
`);

require('../server/generate')();