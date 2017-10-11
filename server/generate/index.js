const path = require('path');
const {spawn} = require('child_process');
const fs = require('fs-extra');
const latestVersion = require('latest-version');
const opn = require('opn');

const onError = e => console.error(e);
const log = console.log.bind(console);
const getTemplatePath = fileName => path.join(__dirname, 'templates', fileName);

const neededPackages = [
    'uizoo',
    'webpack',
    'webpack-dev-server',
    'cache-loader',
    'babel-loader',
    'babel-preset-env',
    'babel-preset-react',
    'babel-plugin-transform-object-rest-spread',
    'babel-plugin-syntax-dynamic-import'
];

const templatesToCopy = [
    'index.html',
    'index.js',
    'webpack.uizoo.js'
];

const appFolder = path.resolve('uizoo-app');
const uiZooScript = `node ${path.join('uizoo-app', 'webpack.uizoo.js')}`;

function generate() {
    log(' ~ Copying templates...');
        copyTemplates()
            .then(() => log(' ~ Executing commands...'))
            .then(() => execCmd('npm i'))
            .then(() => {setTimeout(() => opn('http://localhost:5005/uizoo'), 2500)})
            .then(() => execCmd('npm run uizoo', true))
            .then(() => process.exit(0))
            .catch(onError);
}

function copyTemplates() {
    return new Promise((resolve, reject) => {
        return updatePackageJson()
            .then(() => fs.ensureDir(appFolder))
            .then(() => Promise.all(templatesToCopy.map(copyTemplate)))
            .then(resolve)
            .catch(reject);
    });
}

function copyTemplate(templateName) {
    return fs.copy(getTemplatePath(templateName), path.join(appFolder, templateName));
}

function execCmd(cmd) {
    return new Promise((resolve, reject) => {
        let cmdParts = cmd.split(' ');
        const ls = spawn(cmdParts.shift(), [].concat(cmdParts), {stdio: "inherit"});
        ls.on('close', resolve);
    });
}

function updatePackageJson() {
    return new Promise((resolve, reject) => {
        const pkgPath = path.resolve('package.json');
        const defaultPkgPath = getTemplatePath('package.json');

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
        Promise.all(neededPackages.map(latestVersion))
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