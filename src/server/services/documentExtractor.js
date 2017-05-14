var fs = require("fs");

const DOCUMENTATION_REGEXP = /\/\*\*[\s\S]*\*\//gm;

const DESCRIPTION_SECTION = "description";
const EXAMPLE_SECTION = "example";
const PARAMS = "params";

/**
 * Extracts JSDoc from files
 * @param {String} filePath The file path to read
 * @param {Function} callback Function to invoke on resolve
 */
export default function extract(filePath, callback) {
    var data = fs.readFileSync(filePath, "utf8");
    let matches = DOCUMENTATION_REGEXP.exec(data);

    return {
        [DESCRIPTION_SECTION]: getSection(matches, DESCRIPTION_SECTION),
        [EXAMPLE_SECTION]: getSection(matches, EXAMPLE_SECTION),
        [PARAMS]: getSection(matches, PARAMS),
    };
}

function getSection(documentation, sectionName) {
    let sectionRegExp = new RegExp(`(?=@${sectionName})[\\s\\S]*?(?=\\s*\\*\\s*@)`, "gm");

    let result = sectionRegExp.exec(documentation);;

    return result && result[0];
}