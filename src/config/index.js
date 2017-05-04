import * as fs from "fs";
import * as path from "path";


export const COMPONENT_FOLDER = "/Users/lior.greenberg/Documents/dev/react-bibliotheca/build/data/Components";

export const libraryConfig = {
    componentNameListFetcher: function () {
        return fs.readdirSync(COMPONENT_FOLDER)
            .filter(file => fs.statSync(path.join(COMPONENT_FOLDER, file)).isDirectory());
    }
};

export default libraryConfig;