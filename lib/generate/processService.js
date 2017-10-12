const {spawn} = require('child_process');
const chalk = require('chalk');
const {log} = require('./config');

module.exports = {
    executeCommand
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