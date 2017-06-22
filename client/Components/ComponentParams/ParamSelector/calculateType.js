import _ from 'underscore';
const IS_UNION = (exp = {}) => exp.type === "UnionType" && exp.elements && exp.elements.length;
const IS_LITERAL = (exp = {}) => exp.type === "StringLiteralType";
const HAVE_VALUES_TYPE = 'variant';
const DEFAULT_TYPE = 'default';

/**
 * Calculate a string of the type by the expression
 * @param {Object} doctrineType Doctrine possible expression or type
 * @return {type: string, values: Array}
 */
export default function calculateType(doctrineType = {}) {
    let type = DEFAULT_TYPE,
        values;

    if (IS_UNION(doctrineType)) {
        return calculateTypeForUnion(doctrineType);
    } else if (IS_UNION(doctrineType.expression)) {
        return calculateTypeForUnion(doctrineType.expression);
    } else if (IS_LITERAL(doctrineType) || IS_LITERAL(doctrineType.expression)) {
        type = HAVE_VALUES_TYPE;
        values = [doctrineType.value || doctrineType.expression.value];
    } else if (doctrineType.name || (doctrineType.expression || {}).name) {
        type = doctrineType.name || doctrineType.expression.name;
    }

    if (type === 'boolean' || type === 'bool') {
        values = [true, false];
    }

    return {type, values};
}

/**
 * @param {object} expression
 */
function calculateTypeForUnion(expression) {
    let type = HAVE_VALUES_TYPE;
    let values = _.pluck(expression.elements, 'value');
    values = values.filter(value => typeof value !== 'undefined');
    return {type, values};
}