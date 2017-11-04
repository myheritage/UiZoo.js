const path = require('path');

/**
 * Dev Server config
 */
const serverPort = 5005;
const serverProtocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const serverHost = process.env.HOST || '0.0.0.0';
    
/**
 * The dir where the original command to create UiZoo was originated from,
 * it is where the node_modules are and where to look for components from
 */
const componentsRootDir = path.dirname(__dirname);

/**
 * TIL that glob use '/' separators everywhere!
 */
const componentsRootsDirGlob = path.sep === '\\' ? componentsRootDir.split(path.sep).join('/') : componentsRootDir;

/**
 * Glob to fetch all components for UiZoo
 * It exclude node_modules & .uizoo-app directories
 * If you have a specific convention to your Components names, or specific sub-libraries, you should add it
 * 
 * You can provide either a single glob or an array that will be aggregated
 * (using 'glob-stream', so you can negate and stuff, see: https://github.com/gulpjs/glob-stream)
 */
const componentsGlob = [
    `${componentsRootsDirGlob}/**/*.{js,jsx}`,
    `!${componentsRootsDirGlob}/node_modules/**/*`,
    `!${componentsRootsDirGlob}/.uizoo-app/**/*`,
];

/**
 * Add this tag to a component JSDoc will exclude it from the config files of UiZoo
 * @example
 * This will exclude this component:
 * @componentLibraryIgnore
 */
const ignoreTag = 'componentLibraryIgnore';

module.exports = {
    serverPort,
    serverProtocol,
    serverHost,
    componentsRootDir,
    componentsGlob,
    ignoreTag,
};