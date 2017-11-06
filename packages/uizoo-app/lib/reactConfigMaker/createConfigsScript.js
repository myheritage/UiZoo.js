const gs = require('glob-stream');
const path = require('path');
const fs = require('fs-extra');
const doctrine = require('doctrine');
const reactDocs = require('react-docgen');
const enhanceComment = require('./enhanceComment');

module.exports = createConfigs;

/**
 * Create 2 config files
 * One is a mapping between components names to actual components
 * and another is a mapping between components names to their documentation
 * @param {Object} options includes an array of plugins
 * @return {Promise}
 */
function createConfigs(componentsGlob, componentsRootDir, options) {
    return promiseGlob(componentsGlob)
        .then(filePaths => readFiles(filePaths)
            .then(filesData => processFiles(filesData, filePaths, options))
        )
        .then(componentsMap => writeFiles(componentsMap, componentsRootDir))
        .catch(e => console.error(e));
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
 * @param {Object} options
 * @return {Map} of component name to an object in the form {filePath, comment} 
 */
function processFiles(filesData = [], filePaths = [], options = {}) {
    let componentsMap = new Map();

    filesData.forEach((fileDataBuffer, i) => {
        const fileData = fileDataBuffer.toString();
        let componentInfo = reactDocs.parse(fileData);

        let comment = componentInfo.description,
        filePath = filePaths[i];
        
        let parsedComment = parseCommentToObject(comment);
        comment = enhanceComment(comment, parsedComment, componentInfo);
        // skip this components if it has an ignore tag
        if (options.ignoreTag && !parsedComment[options.ignoreTag]) { 
            const componentName = getComponentName(parsedComment, filePath);
            componentsMap.set(componentName, {filePath, comment});
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
 * @param {String} componentsRootDir 
 * @return {Promise}
 */
function writeFiles(componentsMap, componentsRootDir) {
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
        writeIfDifferent('documentationContainer.js', createDocumentationFile(docMap), componentsRootDir),
        writeIfDifferent('componentsContainer.js', createComponentsFile(comMap, componentsRootDir), componentsRootDir)
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
 * @param {String} componentsRootDir 
 * @return {String}
 */
function createComponentsFile(comMap, componentsRootDir) {
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
 * @param {String} componentsRootDir
 * @return {Promise}
 */
function writeIfDifferent(fileName, fileContent, componentsRootDir) {
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