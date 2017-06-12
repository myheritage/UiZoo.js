import {createIframe, removeIframe} from '../../../../services/compileWithContext';
import Babel from 'babel-standalone';

/**
 * Will try to eval in iframe
 * @param {string} input 
 * @return {function}
 */
export function tryToEvalFunction(input) {
    let output;
    try {
        const iframe = createIframe();
        const win = iframe.contentWindow;
        const jsCode = Babel.transform(input, { presets: ['es2015', 'react'] }).code;
        output = win.eval.call(win, jsCode);
        removeIframe(iframe);
    } catch (e) {
        output = () => console.log(`Failed compiling of: ${input} .`, e);
    }
    return output;
}