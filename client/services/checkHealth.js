import _ from 'underscore';
import ErrorReporter from "./errorReporter";

/**
 * Go through the dependencies and advise the user on problems
 * @param {Object} bibliothecaDocumentation 
 * @param {Object} bibliothecaComponents 
 */
export function checkDependencies (bibliothecaDocumentation, bibliothecaComponents) {
    checkDocumentation(bibliothecaDocumentation);
    checkComponents(bibliothecaComponents);
    checkComponentDocumentationMatch(bibliothecaComponents, bibliothecaDocumentation);
}

/**
 * Check the documentation object which should be something like:
 * {
 *  Card: '/** @name Card @example <Card></Card> @param {String} className* /',
 *  TextField: '/** @name TextField @example <TextField></TextField> @param {String} className* /'
 * }
 * @param {any} bibliothecaDocumentation 
 */
function checkDocumentation(bibliothecaDocumentation) {
    const objNameInError = 'Documentation object: ';
    checkIfObject(bibliothecaDocumentation, objNameInError);
    _.keys(bibliothecaDocumentation).forEach(key => {
        if (typeof bibliothecaDocumentation[key] !== 'string') {
            throwError(`${objNameInError} for Component name: ${key} documentation must be a valid jsdoc string. Got:`, bibliothecaDocumentation[key]);
        }
    });
}

/**
 * Check the Components object which should be something like:
 * {
 *  Card: function Card(_ref){...},
 *  TextField: function TextField(_ref){...},
 * }
 * @param {any} bibliothecaComponents 
 */
function checkComponents(bibliothecaComponents) {
    const objNameInError = 'Components object: ';
    checkIfObject(bibliothecaComponents, objNameInError);
    _.keys(bibliothecaComponents).forEach(key => {
        if (typeof bibliothecaComponents[key] !== 'function') {
            throwError(`${objNameInError} for Component name: ${key} component must be a valid React component. Got:`, bibliothecaComponents[key]);
        }
    });
}

function checkComponentDocumentationMatch(bibliothecaComponents, bibliothecaDocumentation) {
    let componentKeys = _.keys(bibliothecaComponents);
    let documentationKeys = _.keys(bibliothecaDocumentation);

    if (componentKeys.length !== documentationKeys.length) {
        throwError(`The number of components doesn't match the number of documetnations, components: ${componentKeys.length}, documentations: ${documentationKeys.legth}`);
    }

    let unmatchedKeys = _.difference(componentKeys, documentationKeys).concat(_.difference(documentationKeys, componentKeys));

    if (unmatchedKeys.length > 0) {
        throwError(`There are unmatched documentations with components, the unmatched names are:`, unmatchedKeys);
    }
}

/**
 * @param {Object} shouldBeObj 
 * @param {String} objNameInError 
 */
function checkIfObject(shouldBeObj, objNameInError) {
    if (!shouldBeObj || typeof shouldBeObj !== 'object') {
        throwError(`${objNameInError} is not even an object, you should provide a map object of key values to the 'init' function.`);
    }
}

/**
 * Log error to console
 */
function throwError() {
    ErrorReporter.reportError(...arguments);
}