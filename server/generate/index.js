const fs = require('fs-extra');
const opn = require('opn');

const {updatePackageJson} = require('./packageJsonService');
const {copyTemplate} = require('./templatesService');
const {executeCommand} = require('./processService');
const {log, templatesToCopy, appFolderPath} = require('./config');

function generate() {
        log(' ~ Copying templates...\n');
        updatePackageJson()
            .then(() => fs.ensureDir(appFolderPath))
            .then(() => Promise.all(templatesToCopy.map(copyTemplate)))
            .then(() => log(' ~ Executing commands...\n'))
            .then(() => executeCommand('npm i'))
            .then(() => {setTimeout(() => opn('http://localhost:5005/uizoo'), 2500)})
            .then(() => log(' ~ Done! Executing `uizoo` script:\n'))
            .then(() => executeCommand('npm run uizoo'))
            .then(() => process.exit(0))
            .catch(e => console.error(e));
}

module.exports = generate;