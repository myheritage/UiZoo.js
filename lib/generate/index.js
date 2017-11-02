const fs = require('fs-extra');
const opn = require('opn');

const {updatePackageJson} = require('./packageJsonService');
const {copyTemplate} = require('./templatesService');
const {executeCommand} = require('./processService');
const {log, templatesToCopy, appFolderPath} = require('./config');

function generate() {
        updatePackageJson() // if user have uizoo already this will just open it and skip the build
            .then(() => fs.ensureDir(appFolderPath))
            .then(() => log(' ~ Copying templates...\n'))
            .then(() => Promise.all(templatesToCopy.map(copyTemplate)))
            .then(() => log(' ~ Executing commands...\n'))
            .then(() => executeCommand('npm i'))
            .then(() => {setTimeout(() => opn('http://localhost:5005/uizoo'), 2500)})
            .then(() => log(' ~ Done! Executing `uizoo` script:\n'))
            .then(() => executeCommand('npm run uizoo'))
            .then(() => process.exit(0))
            .catch(e => {
                if (e) console.error(e);
            });
}

module.exports = generate;