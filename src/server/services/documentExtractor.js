import * as fs from "fs";

const DOCUMENTATION_REGEXP = /\/\*\*[\s\S]*\*\//gm;

/**
 * Extracts JSDoc from files
 * @param {String} filePath The file path to read
 * @param {Function} callback Function to invoke on resolve
 */
export default function documentExtractor(filePath, callback) {
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error(err);
        }

        let matches = DOCUMENTATION_REGEXP.exec(data);
        callback(matches && matches[0]);
    });
}