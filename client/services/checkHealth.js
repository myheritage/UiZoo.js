import _ from 'underscore';
import ErrorReporter from "./errorReporter";

/**
 * Go through the dependencies and advise the user on problems
 * @param {Object} documentation 
 * @param {Object} components 
 */
export function checkDependencies (documentation, components) {
    checkDocumentation(documentation);
    checkComponents(components);
    checkComponentDocumentationMatch(components, documentation);
}

/**
 * Check the documentation object which should be something like:
 * {
 *  Card: '/** @name Card @example <Card></Card> @param {String} className* /',
 *  TextField: '/** @name TextField @example <TextField></TextField> @param {String} className* /'
 * }
 * @param {any} documentation 
 */
function checkDocumentation(documentation) {
    const objNameInError = 'Documentation object: ';
    checkIfObject(documentation, objNameInError);
    _.keys(documentation).forEach(key => {
        if (typeof documentation[key] !== 'string') {
            throwError(`${objNameInError} for Component name: ${key} documentation must be a valid jsdoc string. Got:`, documentation[key]);
        }
    });
}

/**
 * Check the Components object which should be something like:
 * {
 *  Card: function Card(_ref){...},
 *  TextField: function TextField(_ref){...},
 * }
 * @param {any} components 
 */
function checkComponents(components) {
    const objNameInError = 'Components object: ';
    checkIfObject(components, objNameInError);
    _.keys(components).forEach(key => {
        if (typeof components[key] !== 'function') {
            throwError(`${objNameInError} for Component name: ${key} component must be a valid React component. Got:`, components[key]);
        }
    });
}

function checkComponentDocumentationMatch(components, documentation) {
    let componentKeys = _.keys(components);
    let documentationKeys = _.keys(documentation);

    if (componentKeys.length !== documentationKeys.length) {
        throwError(`The number of components doesn't match the number of documentations, components: ${componentKeys.length}, documentations: ${documentationKeys.length}`);
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