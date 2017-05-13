import * as fs from "fs";
import * as path from "path";

const USER_DATA_FOLDER = path.resolve(__dirname  + "/../../userdata");

export default function createComponentContainer(componentsData) {
    let containerContent = "";
    let componentNameList = [];

    componentsData.forEach(({path, name}) => {
        containerContent += `import ${name} from "${path}";\n`;
        componentNameList.push(name);
    });

    containerContent += `window.libraryData = {${componentNameList.join()}};`;

    if (!fs.existsSync(USER_DATA_FOLDER)) {
        fs.mkdirSync(USER_DATA_FOLDER);
    }

    fs.writeFileSync(USER_DATA_FOLDER + "/container.js", containerContent, { flag: "w+" });
};