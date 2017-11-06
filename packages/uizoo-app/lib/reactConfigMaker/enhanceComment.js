module.exports = enhanceComment;

/**
 * Enhances the comment from the assumed data of the file
 * @param {string} comment 
 * @param {Object} parsedComment 
 * @param {Object=} props 
 * @returns {string}
 */
function enhanceComment(comment, parsedComment, {displayName, props = {}}) {
    comment = verifyNameInJsdoc(comment, parsedComment, displayName);
    comment = verifyPropsInJsdoc(comment, parsedComment, props);

    return comment;
}

/**
 * Makes sure that the comment has a name
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
 * Verifies that our jsdoc has all the props from the object
 * @param {string} comment 
 * @param {Object} parsedComment 
 * @param {Object} props 
 * @returns {string}
 */
function verifyPropsInJsdoc(comment, parsedComment, props) {
    let existingParams = new Set();
    (parsedComment.param || []).forEach(param => existingParams.add(param.name));
    
    for (let prop in props) {
        if (existingParams.has(prop)) {
            continue;
        }
        comment = addParamJsdoc(comment, props, prop);
    }
    return comment;
}

/**
 * Adds a single jdsoc prop line
 * @param {string} comment 
 * @param {Object} props 
 * @param {string} prop 
 * @returns {string}
 */
function addParamJsdoc(comment, props, prop) {
    let paramType = getParamType(props[prop].type);
    let paramName = getParamName(prop, props[prop]);
    
    let commentLine = `\n@param {${paramType}} ${paramName} ${props[prop].description}`;
    comment += commentLine;
    return comment;
}

/**
 * Gets the JSDoc type from the PropType object
 * @param {{name: string, value?: any}} type 
 * @returns {string}
 */
function getParamType(type) {
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
            paramType = type.value.map(obj => obj.value).join("|");
            break;

        case 'union':
            // recursive
            paramType = type.value.map(obj => getParamType(obj)).join("|");
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
            paramType = "node";
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
    if (defaultValue) {
        name = `${name}=${defaultValue.value}`;
    }
    if (!required) {
        name = `[${name}]`;
    }
    return name;
}