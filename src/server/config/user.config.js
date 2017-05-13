import * as fs from "fs";
import * as path from "path";

<<<<<<< HEAD
export const COMPONENT_FOLDER = "/Users/lior.greenberg/Documents/dev/react-bibliotheca/demo/Components";
=======
export const COMPONENT_FOLDER = "/Users/lior.greenberg/Documents/dev/react-bibliotheca/src/client/Components";
>>>>>>> a45b2627b8844fe048fc5185558d767c16004915

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
    entryFile: '/Users/lior.greenberg/Documents/dev/react-bibliotheca/build/userdata/container.js',
    SCSSFilesGlob: `${COMPONENT_FOLDER}/**/*.scss`,
};

export default libraryConfig;