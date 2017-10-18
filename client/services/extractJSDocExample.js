/**
 * Extracts an example from the jsdoc doctrine object
 * @param {Object} componentJsDoc The component's jsdoc docrtine object
 * @param {Number} exampleIndex The wanted example index
 * @return {String} The wanted example
 */
export default function extractJSDocExample(componentJsDoc = {}, exampleIndex) {
    let example = '';
    // Example section in jsdoc(holde multiple examples)
    const {example: examples} = componentJsDoc;

    if (examples && examples.length) {
        // Extract specific example
        example = examples[exampleIndex] ? examples[exampleIndex].description : '';
    }

    return example;
}