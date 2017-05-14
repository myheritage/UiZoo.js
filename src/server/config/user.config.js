import * as fs from "fs";
import * as path from "path";
import * as glob from "glob";

export const COMPONENT_FOLDER = "/Users/lior.greenberg/Documents/dev/react-bibliotheca/demo/Components";

const libraryConfig = {
    /**
     * This should return an object with this structure { name, path}
     */
    componentDataListFetcher: function () {
        let files = glob.sync(`${COMPONENT_FOLDER}/**/index.js`);

        files = files.map(getComponentConfig);

        return files;
    },
    JSFilesGlob: `${COMPONENT_FOLDER}/index.js`,
    entryFile: '/Users/lior.greenberg/Documents/dev/react-bibliotheca/build/userdata/container.js',
    SCSSFilesGlob: `${COMPONENT_FOLDER}/**/*.scss`,
};

function getComponentConfig(filePath) {
    let name = filePath.replace(`${COMPONENT_FOLDER}/`, "").replace("/index.js", "");
    let path = filePath;

    return {
        name,
        path
    };
}

export default libraryConfig;