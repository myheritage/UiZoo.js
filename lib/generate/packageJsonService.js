const path = require('path');
const latestVersion = require('latest-version');
const fs = require('fs-extra');
const {resolveTemplatePath} = require('./templatesService');
const {uiZooScript, neededPackages} = require('./config');
const {executeCommand, getNpmCommand} = require('./processService');

module.exports = {
    updatePackageJson
};

/**
 * Update the folder's package.json with needed dependencies or use a fresh one from templates
 * if there is none
 * @return {Promise}
 */
function updatePackageJson() {
    return new Promise((resolve, reject) => {
        const pkgPath = path.resolve('package.json');
        const defaultPkgPath = resolveTemplatePath('package.json');

        fs.exists(pkgPath)
            .then(exists => fs.readFile(exists ? pkgPath : defaultPkgPath))
            .then(modifyPackage)
            .then(pkg => fs.writeJSON(pkgPath, pkg, {spaces: 2}))
            .then(resolve)
            .catch(reject);
    });
}

function modifyPackage(packageBuffer) {
    let pkg = JSON.parse(packageBuffer.toString());
    if (pkg && pkg.scripts && pkg.scripts.uizoo) {
        executeCommand(`${getNpmCommand()} run uizoo`);
        return Promise.reject();
    }

    return new Promise((resolve, reject) => {
        Promise.all(neededPackages.map(latestVersion))
            .then(neededPackagesVersions => {
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
                resolve(pkg);
            })
            .catch(reject);
    });
}