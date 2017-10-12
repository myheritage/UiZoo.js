const path = require('path');

/**
 * Dev Server port
 */
const serverPort = 5005;
    
/**
 * The dir where the original command to create UiZoo was originated from,
 * it is where the node_modules are and where to look for components from
 */
const componentsRootDir = path.dirname(__dirname);

/**
 * Glob to fetch all components for UiZoo
 * It exclude node_modules & uizoo-app directories
 * If you have a specific convention to your Components names, or specific sub-libraries, you should add it
 */
const componentsGlob = [...componentsRootDir.split(path.sep), '!(node_modules|uizoo-app)', '**', '*.js'].join('/');

/**
 * Add this tag to a component JSDoc will exclude it from the config files of UiZoo
 * @example
 * This will exclude this component:
 * @componentLibraryIgnore
 */
const ignoreTag = 'componentLibraryIgnore';

/**
 * Strategy to decide on the file's JSDoc by a regex
 * It will take the first JSDoc comment answering this regex
 * It should have either a @description or @example tag in it
 */
const componentMainCommentRegex = /\/\*\*(\s*\*\s*.*?)*@(description|example).*(\s*\*.*)*/g;

module.exports = {
    serverPort,
    componentsRootDir,
    componentsGlob,
    ignoreTag,
    componentMainCommentRegex,
};