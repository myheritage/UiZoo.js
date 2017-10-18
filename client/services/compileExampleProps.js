import {reportError}  from './errorReporter';
/**
 * Compiles default example and returns it's props
 * @param {string} example
 */
export default function compileExampleProps(example, compiler) {
    let result = null;
    let error = null;
    let CompiledNode = null;
    try {
        CompiledNode = compiler(example);
    } catch (e) {
        error = e;
    }
    if (!error && CompiledNode && CompiledNode.type) {
        result = CompiledNode.props;
    } else {
        let errorMessage = error
            ? error
            : 'error in example';
        reportError(errorMessage);
    }

    return result;
}