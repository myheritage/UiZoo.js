import * as fs from "fs";

import { parseSingleDoc } from "./documentationParser";

const DOCUMENTATION_REGEXP = /\/\*\*[\s\S]*\*\//gm

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
    let matches = data.match(DOCUMENTATION_REGEXP);

    let parsedDoc = matches && parseSingleDoc(matches[0]);
    return parsedDoc;
}