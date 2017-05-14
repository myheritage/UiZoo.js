import * as _ from "underscore";

const PRIMITIVE_TYPES = ["object", "number", "boolean", "function", "string"];
const BOOLEAN_VALUES = [true, false];
const missingErrorTemplate = section => `${section}s section is missing!`;

/**
 * Parses an dictionary of JSDDOC documentations
 * @param {Object} componentsDictionary
 */
export function parseDocs(componentsDictionary) {
    return _.mapObject(componentsDictionary, (doc) => {
        return parseSingleDoc(doc);
    });
}

/**
 * Parses a single component documentation
 * @param {string} componentDocumentation
 * @returns {Object} A parsed documentation object
 */
export function parseSingleDoc(componentDocumentation) {
    let metaData;

    if (componentDocumentation) {
        // Regexp the matches groups for the description, example, and params(as multiple)

        // Get the regexp matches
        let regexResults = componentDocumentation.match(/(@description[^@]*)|(@example[^@]*)|(@param.*)/gmi);

        if (regexResults) {
            let [description, examples, ...params] = regexResults;

            // Parse the documentation parts.
            metaData = {
                description: parseDescription(description),
                examples: parseExamples(examples),
                params: parseParams(params),
                invalid: {
                    description: getInvalidErrors(componentDocumentation, "Description"),
                    examples: getInvalidErrors(componentDocumentation, "Example"),
                    params: getInvalidErrors(componentDocumentation, "Param")

                }
            };
        }
    }

    return metaData;
}

function getInvalidErrors(documentation, sectionName) {
    return documentation.includes(sectionName.toLowerCase()) ? undefined : missingErrorTemplate(sectionName);
}

/**
 * Parses the description into fitting format
 * @param {string} descriptionString The descriptions part of the documentation
 */
function parseDescription(descriptionString) {
    return descriptionString
        .replace(/@description\s/, '') // Replace @description header
        .replace(/^\s*\*/gm, '') // Remove *
        .trim();   // Remove spaces.
}

/**
 * This will split to different examples based on a leading number (like 1), 2) .. )
 * @param {String} examplesString the example block
 * @returns {Array}
 */
function parseToExamples(examplesString) {
    let examples = [],
        currentExample = '',
        examplesRows = examplesString.split(/\s*$/gm);

    for (let i = 0, l = examplesRows.length; i < l; i++) {
        if (/^\s*\d\)/.exec(examplesRows[i])) { // check if it's a new example
            examples.push(currentExample);
            currentExample = examplesRows[i].replace(/^\s*\d\)/, '');
        } else {
            currentExample += examplesRows[i];
            if (i === examplesRows.length - 1) { // checks if it's the last line! should push to array
                examples.push(currentExample);
            }
        }
    }

    return examples;
}

/**
 * Parses example string into example arrays
 * @param {string} examplesString The examples part of the documentation
 */
function parseExamples(examplesString) {
    examplesString = examplesString
        .replace(/@example\s/, '') // Replace @example header
        .replace(/^\s*\*/gm, ''); // Remove *
    return parseToExamples(examplesString)
        .filter(curr => curr)    // Remove empty strings
        .map(curr => curr.trim());
}

/**
 * Parses a json string, if parse passed return the value, if not return undefined
 * @param {string} str The json string
 * @returns {*} The parsed JS object
 */
export function parseJsonString(str) {
    let value;
    try {
        value = JSON.parse(str);
    } catch (e) {

    }
    return value;
}

/**
 * Checks if a param has an optional value, returns an object describing the value definition
 * @param {string} paramNameString The param name section of the documentation
 * @returns {{name: *, defaultValue: *, isOptional: boolean}} The object describing the param optional defintions
 */
function getParamValueDefintiion(paramNameString) {
    // A regexp the finds groups matching [name="defaultValue"] as two groups
    let regexpGroups = /\[([^=]*)=*(.*)\]/g.exec(paramNameString);

    // If matched, get the splitted name and default value as a string
    let [name, defaultValue] = regexpGroups ? regexpGroups.slice(1) : [];

    // Returns an object describing the actual name of the param, the default value of the param, and if it's optional.
    return {
        name: name || paramNameString,
        defaultValue: defaultValue ? parseJsonString(defaultValue.replace(/'/g, "\"")) : undefined,
        isOptional: !!regexpGroups
    };
}

/**
 * Parses param strings into {type,name,value} objects
 * @param {string[]} paramsStringArray The param strings split into an array
 */
function parseParams(paramsStringArray) {
    return paramsStringArray.map(currParam => {
        let result;

        // This regexp splits the param line to 3 sections, type [param=defaultValue] description
        let paramGroups = /@param.*{([^}]+)}\s+([^\s]*)\s*(.*)/g.exec(currParam);

        if (paramGroups) {
            // Remove the @param header, and match type and name of current param.
            let [type, name, description] = paramGroups ? paramGroups.slice(1).map(curr => curr.trim()) : [];

            // Remove quotes if exist
            // type = type.replace(/^["']|["']$/g, '');
            let variantValues = type
                    .split("|")
                    .map(parseJsonString)
                    .filter(curr => curr),
                isTypeVariant = !_.contains(PRIMITIVE_TYPES, type.toLowerCase()),
                isBoolean = type.toLowerCase() === "boolean";

            // Treat boolean as variant with boolean values.
            if (isBoolean) {
                variantValues = BOOLEAN_VALUES;
            }

            result = {
                type: isTypeVariant ? "variant" : type,
                name,
                values: isTypeVariant || isBoolean ? variantValues : [],
                description
            };

            // Extend the result with optional default values.
            result = _.extend(result, getParamValueDefintiion(name));
        } else {
            result = {
                name: "invalid param",
                invalid: `param is invalid! ${paramsStringArray}`,
            }
        }

        return result;
    });
}