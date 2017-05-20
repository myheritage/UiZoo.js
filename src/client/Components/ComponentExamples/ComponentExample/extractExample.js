const findTitleRegExp = /((\s|.)*?)</;
const findCodeRegExp = /<(.|\s)*/;

/**
 * Extract parts of the example to title and code
 */
export default function extractExample(example) {
    let title = '',
        code = '';

    if (example) {
        let titleMatches = findTitleRegExp.exec(example) || [];
        title = titleMatches[1] || title;

        let codeMatches = findCodeRegExp.exec(example) || [];
        code = codeMatches[0] || code;
    }

    return {title, code};
}