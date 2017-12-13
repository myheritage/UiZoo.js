module.exports = enhanceComment;

const DEFAULT_PROP_TYPE = 'string';

/**
 * Enhances the comment from the assumed data of the file
 * Eventually to return a better comment with all the information we can get
 * @param {string} comment 
 * @param {Object} parsedComment 
 * @param {Object} [props]
 * @returns {string}
 */
function enhanceComment(comment, parsedComment, {displayName, props = {}}) {
    comment = verifyNameInJsdoc(comment, parsedComment, displayName);
    comment = verifyPropsInJsdoc(comment, parsedComment, props);
    return comment;
}

/**
 * Makes sure that the comment has a name, it will be added if missing and we have it
 * @param {string} comment 
 * @param {Object} parsedComment 
 * @param {string} displayName 
 * @returns {string}
 */
function verifyNameInJsdoc(comment, parsedComment, displayName) {
    if (!parsedComment.name || !parsedComment.name[0] || !parsedComment.name[0].name) {
        parsedComment.name = [{name: displayName}]
        let commentLine = `\n@name ${displayName}`;
        comment += commentLine;
    }
    return comment;
}

/**
 * Verifies that our JSDoc has all the props from the object
 * @param {string} comment 
 * @param {Object} parsedComment 
 * @param {Object} props 
 * @returns {string}
 */
function verifyPropsInJsdoc(comment, parsedComment, props) {
    let existingParams = new Set();
    (parsedComment.param || []).forEach(param => existingParams.add(param.name));
    const propKeys = Object.keys(props);
    for (let i = 0, l = propKeys.length; i < l; i++) {
        let prop = propKeys[i];
        if (existingParams.has(prop)) {
            continue;
        }
        comment = addParamJsdoc(comment, props, prop);
    }
    return comment;
}

/**
 * Adds a single JSDoc line of a prop in the comment
 * @param {string} comment 
 * @param {Object} props 
 * @param {string} prop 
 * @returns {string}
 */
function addParamJsdoc(comment, props, prop) {
    const paramType = getParamType(props[prop].type);
    const paramName = getParamName(prop, props[prop]);
    const commentLine = `\n@param {${paramType}} ${paramName} ${props[prop].description}`;
    comment += commentLine;
    return comment;
}

/**
 * Resolves the JSDoc type from the PropType object
 * @param {{name: string, value?: any}} type 
 * @returns {string}
 */
function getParamType(type = {}) {
    let paramType;
    switch (type.name) {
        case 'node':
        case 'bool':
        case 'func':
        case 'object':
        case 'number':
        case 'string':
            paramType = type.name;
            break;

        case 'enum':
            paramType = Array.isArray(type.value) ? type.value.map(obj => obj.value).join("|") : DEFAULT_PROP_TYPE;
            break;

        case 'union':
            // recursive
            paramType = Array.isArray(type.value) ? type.value.map(obj => getParamType(obj)).join("|") : DEFAULT_PROP_TYPE;
            break;

        case 'arrayOf':
            paramType = `${getParamType(type.value)}[]`;
            break;

        case 'objectOf':
        case 'shape':
            paramType = 'object';
            break;

        // any unhandled case, or 'custom'
        default: 
            paramType = DEFAULT_PROP_TYPE;
            break;
    }

    return paramType;
}

/**
 * Gets the JSDoc name of the param
 * @example myParam
 * @example [myParam=true]
 * @param {string} name 
 * @param {{defaultValue?: Object, required: boolean}} param1 
 * @returns {string}
 */
function getParamName(name, {defaultValue, required}) {
    if (defaultValue && !required) {
        name = `${name}=${defaultValue.value}`;
    }
    if (!required) {
        name = `[${name}]`;
    }
    return name;
}