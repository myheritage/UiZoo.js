// Internal script to generate UiZoo component's mapping to documentation

function howToUse() {
    explanation = 'How to use: Run `node documentationMapper.js "./client/Components/UI/*/index.js" "./client/Components/UI/(.+)/index.js" "./client/documentation.js"`';
    console.info(explanation);
    process.exit(1);
}

const path = require("path");
const fs = require("fs");
const glob = require("glob");

const inputGlob = process.argv[2];
const nameRegexString = process.argv[3];
const outputPath = process.argv[4];

if (!nameRegexString) {
    console.error("Must provide the name regex");
    howToUse();
}
const nameRegex = new RegExp(nameRegexString);

glob(inputGlob, {}, (error, componentsPaths) => {
    if (error) {
        console.error("Had an error finding the input glob files: " + error);
        howToUse();
    }

    let nameToDoc = {};
    let componentsDone = 0;
    for (let componentPath of componentsPaths) {
        let componentNameMatches = nameRegex.exec(componentPath);
        if (!componentNameMatches) {
            console.error("Could not get component name for component in path " + componentPath);
            howToUse();
        }
        let componentName = componentNameMatches[1];

        fs.readFile(componentPath, "utf8", (error, data) => {
            if (error) {
                console.error("Had an error opening the file " + componentPath + ": " + error);
                howToUse();
            }
            let documentation = getDocumentation(componentName, data);
            nameToDoc[componentName] = documentation;
            attemptToFinish();
        });
    }
    
    function attemptToFinish() {
        componentsDone++;
        if (componentsDone === componentsPaths.length) {
            let results = 
            `export default ${transformToJSON(nameToDoc)};`;
            fs.readFile(outputPath, "utf8", (error, data) => {
                if(1, data !== results) {
                    fs.writeFile(outputPath, results, (error, data) => {
                        if (error) {
                            console.error("Had an error writing the results file: " + error);
                            howToUse();
                        }
                        console.log("Wrote documentation map successfully.");
                    });
                }
            });
        }
    }

    function transformToJSON(obj) {
        let keys = Object.keys(obj),
            jsonReadyObj = {};
        keys.sort();
        for (let i = 0, l = keys.length; i < l; i++) {
            jsonReadyObj[keys[i]] = obj[keys[i]];
        }
        return JSON.stringify(jsonReadyObj);
    }
});

/**
 * @param {string} name 
 * @param {string} file 
 */
function getDocumentation(name, file) {
    const jsDocs = file.match(/\/\*\*(\n|.)+?\*\//g);
    // our assumption is that what we need is the first jsdoc in the page.
    if (!jsDocs) {
        console.error("Could not get documentation for file " + name);
        howToUse();
    }
    const doc = jsDocs[0];
    return doc;
}