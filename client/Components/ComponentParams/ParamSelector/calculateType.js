import _ from 'underscore';
const IS_UNION = (exp) => exp.type === "UnionType" && exp.elements && exp.elements.length;
const HAVE_VALUES_TYPE = 'variant';

/**
 * Calculate a string of the type by the expression
 * @param {{name: [String], expression: Object}}} type Doctrine possible expression or type
 * @return {type: string, values: Array}
 */
export default function calculateType({name: typeName, expression = {}}) {
    let type = 'default',
        values;
    if (typeName || expression.name) {
        type = typeName || expression.name;
    } else if (IS_UNION(expression)) {
        type = HAVE_VALUES_TYPE;
        values = _.pluck(expression.elements, 'value');
        values = values.filter(value => typeof value !== 'undefined');
    }

    if (type === 'boolean' || type === 'bool') {
        values = [true, false];
    }

    return {type, values};
}