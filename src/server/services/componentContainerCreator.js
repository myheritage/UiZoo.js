import * as fs from "fs";

export default function createComponentContainer(componentsData) {
    let containerContent = "";
    let componentNameList = [];



    componentsData.forEach(({path, name}) => {
        containerContent += `import ${name} from ${path}\n`;
        componentNameList.push(name);
    });

    containerContent += `export default {${componentNameList.join()}};`;

    fs.writeFileSync(__dirname  + "/../../client/libraryDataContainer.js", containerContent, { flag: "w+" });
};