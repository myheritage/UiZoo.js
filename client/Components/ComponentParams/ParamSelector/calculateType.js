import _ from 'underscore';
const IS_UNION = (exp) => exp.type === "UnionType" && exp.elements && exp.elements.length;
const HAVE_VALUES_TYPE = 'variant';

/**
 * Calculate a string of the type by the expression
 * @param {Object} expression Doctrine possible expressions
 * @return {type: string, values: Array}
 */
export default function calculateType(expression = {}) {
    let type = 'default',
        values;
    if (expression.name) {
        type = expression.name;
    } else if (IS_UNION(expression)) {
        type = HAVE_VALUES_TYPE;
        values = _.pluck(expression.elements, 'value');
        values = values.filter(value => typeof value !== 'undefined');
    }

    return {type, values};
}