const path = require('path');
const fs = require('fs-extra');
const inquirer = require('inquirer');
const latestVersion = require('latest-version');

const onError = e => console.error(e);
const neededPackages = ['uizoo'];
const uiZooScript = 'TODO script here';

/**
 * Questions:
 * #1 Provide a glob to your components (default: '*'):
 */
const globPromptName = 'glob';
const questions = [
    {
        name: globPromptName,
        message: 'Provide a glob to find your components, default is all files:',
        default: path.join('**','*')
    }
];

function generate() {
    inquirer.prompt(questions)
        .then(copyTemplates)
        .then(executeCommands)
        .catch(onError);
}

function copyTemplates(answers) {
    return new Promise((resolve, reject) => {
        return updatePackageJson()
            .then(p => console.log(p))
            .then(() => resolve())
            .catch(reject);
    });
}

function executeCommands() {
    return new Promise((resolve, reject) => {
        resolve();
    });
}

function updatePackageJson() {
    return new Promise((resolve, reject) => {
        const pkgPath = path.resolve('package.json');
        const defaultPkgPath = path.join(__dirname, 'templates','package.json');

        fs.exists(pkgPath)
            .then(exists => fs.readFile(exists ? pkgPath : defaultPkgPath))
            .then(modifyPackage)
            .then(pkg => fs.writeFile(pkgPath, pkg))
            .then(resolve)
            .catch(reject);
    });
}

function modifyPackage(packageBuffer) {
    return new Promise((resolve, reject) => {
        Promise.all(neededPackages.map(p => latestVersion(p)))
        .then((neededPackagesVersions) => {
            let pkg = JSON.parse(packageBuffer.toString());
            // Add dependencies
            neededPackages.forEach((neededPackage, i) => {
                if((!pkg.dependencies || !pkg.dependencies[neededPackage]) &&
                    (!pkg.devDependencies || !pkg.devDependencies[neededPackage])) {
                    pkg.devDependencies = Object.assign({}, pkg.devDependencies, {
                        [neededPackage]: `~${neededPackagesVersions[i]}`
                    });
                }
            });
            // Add scripts
            pkg.scripts = Object.assign({}, pkg.scripts, {
                "uizoo": uiZooScript
            });
            resolve(JSON.stringify(pkg));
        })
        .catch(reject);
    });
}

module.exports = generate;