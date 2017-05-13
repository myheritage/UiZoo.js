import * as fs from "fs";
import * as path from "path";

export const COMPONENT_FOLDER = "/Users/lior.greenberg/Documents/dev/react-bibliotheca/demo/Components";

const libraryConfig = {
    /**
     * This should return an object with this structure { name, path}
     */
    componentDataListFetcher: function () {
        return fs.readdirSync(COMPONENT_FOLDER)
            .filter(file => fs.statSync(path.join(COMPONENT_FOLDER, file)).isDirectory()).map(fileName => ({
                name: fileName,
                path: `${COMPONENT_FOLDER}/${fileName}`
            }));
    },
    JSFilesGlob: `${COMPONENT_FOLDER}/index.js`,
    entryFile: '/Users/lior.greenberg/Documents/dev/react-bibliotheca/src/client/index.js',
    SCSSFilesGlob: `${COMPONENT_FOLDER}/**/*.scss`,
};

export default libraryConfig;