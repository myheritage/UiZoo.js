import * as fs from "fs";
import * as path from "path";

export const COMPONENT_FOLDER = "/Users/noam.elboim/Documents/cool stuff/react-bibliotheca/react-bibliotheca/src/client/Components";

const libraryConfig = {
    componentNameListFetcher: function () {
        return fs.readdirSync(COMPONENT_FOLDER)
            .filter(file => fs.statSync(path.join(COMPONENT_FOLDER, file)).isDirectory());
    },
    JSFilesGlob: `${COMPONENT_FOLDER}/index.js`,
    entryFile: '/Users/lior.greenberg/Documents/dev/react-bibliotheca/src/client/index.js',
    SCSSFilesGlob: `${COMPONENT_FOLDER}/**/*.scss`,
};

export default libraryConfig;