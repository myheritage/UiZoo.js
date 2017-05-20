/**
 * Will try to parse string as JSON, will fallback to defaultValue if failed
 * @export
 * @param {string} codeToParse 
 * @param {any} defaultValue 
 * @return {any}
 */
export default function tryToParseJson(codeToParse, defaultValue) {
    let parsedValue;
    
    if (typeof defaultValue === 'undefined') {
        defaultValue = codeToParse;
    }

    try {
        parsedValue = JSON.parse(codeToParse);
    } catch (e) {
        parsedValue = defaultValue
    }

    return parsedValue;
}