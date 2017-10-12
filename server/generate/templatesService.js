const path = require('path');
const fs = require('fs-extra');
const {appFolderPath} = require('./config');

module.exports = {
    copyTemplate,
    resolveTemplatePath
};

/**
 * Copy template from template folders to the new uizoo-app folder
 * @param {String} templateName 
 * @return {Promise}
 */
function copyTemplate(templateName) {
    return fs.copy(resolveTemplatePath(templateName), path.join(appFolderPath, templateName));
}
function resolveTemplatePath(fileName) {
    return path.join(__dirname, 'templates', fileName);
}