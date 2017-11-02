const gs = require('glob-stream');
const path = require('path');
const fs = require('fs-extra');
const doctrine = require('doctrine');

const {
    ignoreTag,
    componentMainCommentRegex,
    componentsGlob,
    componentsRootDir
} = require('./config');

module.exports = createConfigs;

/**
 * Create 2 config files
 * One is a mapping between components names to actual components
 * and another is a mapping between components names to their documentation
 * @return {Promise}
 */
function createConfigs() {
    return promiseGlob(componentsGlob)
        .then(filePaths => readFiles(filePaths)
            .then(filesData => processFiles(filesData, filePaths))
        )
        .then(writeFiles);
}

/**
 * @param {Array} filePaths 
 * @return {Promise}
 */
function readFiles(filePaths) {
    return Promise.all(filePaths.map(filePath => fs.readFile(filePath)));
}

/**
 * Process components files and output a map that we can write to files
 * @param {Array} filesData 
 * @param {Array} filePaths
 * @return {Map} of component name to an object in the form {filePath, comment} 
 */
function processFiles(filesData = [], filePaths = []) {
    let componentsMap = new Map();

    filesData.forEach((fileDataBuffer, i) => {
        const fileData = fileDataBuffer.toString();
        // Get component main comment
        const matches = fileData.match(componentMainCommentRegex);
        if (matches && matches.length) {
            // Choosing the first comment that matched the regex
            let comment = matches[0],
                filePath = filePaths[i];

            const parsedComment = parseCommentToObject(comment);
            // skip this components if it have an ignore tag
            if (!parsedComment[ignoreTag]) { 
                const componentName = getComponentName(parsedComment, filePath);
                componentsMap.set(componentName, {filePath, comment});
            }
        }
    });

    return componentsMap;
}

/**
 * Write the map data to files
 * It will sort the component names
 * It will skip the writing if there is nothing to write or nothing had changed
 * 
 * @param {Map} componentsMap 
 * @return {Promise}
 */
function writeFiles(componentsMap) {
    let componentsKeys = [...componentsMap.keys()];
    if (!componentsKeys.length) return null;
    let docMap = new Map(),
        comMap = new Map();

    componentsKeys.sort();
    componentsKeys.forEach(componentName => {
        let componentConf = componentsMap.get(componentName);
        docMap.set(componentName, componentConf.comment);
        comMap.set(componentName, componentConf.filePath);
    });

    return Promise.all([
        writeIfDifferent('documentationContainer.js', createDocumentationFile(docMap)),
        writeIfDifferent('componentsContainer.js', createComponentsFile(comMap))
    ]);
}

/**
 * Strategy to figure out the component name
 * 
 * @param {Object} parsedComment 
 * @param {String} filePath 
 */
function getComponentName(parsedComment, filePath) {
    let name;
    if (parsedComment.name && parsedComment.name[0] && parsedComment.name[0].name) {
        // Option 1: name in JSDoc @name tag
        name = parsedComment.name[0].name;
    } else {
        let fileParts = path.parse(filePath) || {};
        if (fileParts.name && !(/^index/.test(fileParts.name))) {
            // Option 2: try to get name from file name, but make sure it's not index.~ something
            name = fileParts.name;
        } else {
            // Option 3: nothing left - take dir name
            name = path.basename(fileParts.dir); // parent's directory
        }
    }
    return name;
}

/**
 * Create the documentation file from the map
 * @param {Map} docMap 
 * @return {String}
 */
function createDocumentationFile(docMap) {
    let docFile = 'export default {\n';
    for (let [componentName, comment] of docMap) {
        // escaping ` and ${} by \` and \${}
        docFile += `${componentName}: \`${comment.replace(/\`/g, '\\`').replace(/\$\{/g, '\\${')}\`,\n`;
    }
    docFile += '}';
    return docFile;
}

/**
 * Create the components file from the map
 * @param {Map} comMap 
 * @return {String}
 */
function createComponentsFile(comMap) {
    let comFile = '',
        exportLine = 'export default {\n';
    for (let [componentName, filePath] of comMap) {
        comFile += `import ${componentName} from '${filePath.replace(componentsRootDir, '..')}';\n`;
        exportLine += `    ${componentName},\n`;
    }
    comFile += `${exportLine}};`;
    return comFile;
}

/**
 * Write only if current content is different to prevent
 * @param {String} fileName 
 * @param {String} fileContent 
 * @return {Promise}
 */
function writeIfDifferent(fileName, fileContent) {
    const filePath = path.join(componentsRootDir, '.uizoo-app', fileName);
    return new Promise((resolve, reject) => {
        fs.readFile(filePath)
            .then(fileBuffer => fileContent !== fileBuffer.toString())
            .then(shouldWrite => shouldWrite ? fs.writeFile(filePath, fileContent) : true)
            .then(resolve)
            .catch(reject);
    });
}

/**
 * Us doctrine to transform String comment to an Object 
 * @param {String} comment 
 * @return {Object}
 */
function parseCommentToObject(comment) {
    const {tags = []} = doctrine.parse(comment, {unwrap: true, recoverable: true, sloppy: true});
    let doc = {};
    tags.forEach(tag => {
        doc[tag.title] = doc[tag.title] || [];
        doc[tag.title].push(tag);
    });
    return doc;
}

/**
 * Turn the glob stream to a promise that reslove the files
 * @param {Array|String} globs 
 * @return {Promise}
 */
function promiseGlob(globs) {
    return new Promise((resolve, reject) => {
        let files = [];
        let ls = gs(componentsGlob);
        ls.on('data', (f = {}) => {
            if (f.path) files.push(f.path);
        });
        ls.on('error', reject);
        ls.on('end', () => {
            resolve(files);
        });
    });
}