const {spawn} = require('child_process');
const chalk = require('chalk');
const opn = require('opn');
const {log, localPort} = require('./config');

module.exports = {
    executeCommand,
    getNpmCommand,
    openLocalHostInBrowser
};

/**
 * Execute a command to terminal with inherit io, resolve when it is done
 * @param {String} cmd 
 * @return {Promise}
 */
function executeCommand(cmd) {
    return new Promise((resolve, reject) => {
        log(chalk.grey(`  ${cmd}\n`));
        let cmdParts = cmd.split(' ');
        const ls = spawn(cmdParts.shift(), [].concat(cmdParts), {stdio: "inherit"});
        ls.on('close', resolve);
    });
}

function getNpmCommand() {
    return isWindows() ? "npm.cmd" : "npm";
}

function isWindows() {
    return /^win/.test(process.platform);
}

function openLocalHostInBrowser() {
    setTimeout(() => opn(`http://localhost:${localPort}/uizoo`), 2500); // 2.5s to let webpack dev settle
}