export default function documentExtractor(fileName, callback) {
    fs = require('fs');
    fs.readFile(fileName, "utf8", callback);
}