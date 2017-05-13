import * as path from "path";
import * as rollup from "rollup";

import { ROOT_PATH }  from "../main/server";
import { USER_ASSETS_DIRECTORY } from "../consts/bundle.const";
import { createConfig } from "../consts/rollupConfig";

const CSS_OUTPUT_PATH = `${USER_ASSETS_DIRECTORY}/index.css`;
const JS_OUTPUT_PATH = `${USER_ASSETS_DIRECTORY}/index.js`;

/**
 * 
 * @param {Object} userConfig User library config
 */
export default function bundleUserAssets({entryFile, JSFilesGlob, SCSSFilesGlob}) {
    let rollupConfig = createConfig(entryFile, JSFilesGlob, USER_ASSETS_DIRECTORY);
	var outputPath = path.resolve(__dirname + "/../../userdata/index.js");
	
	return rollup.rollup(rollupConfig)
		.then(bundle => {
			bundle.write({
				format: 'iife',
				dest: outputPath,
				moduleName: "libraryModule"
			});
		})
		.then(() => console.log("After rollup:",  outputPath))
		.catch(err => {
			err.message && console.error(`Error: ${err.message}`);
			err.formatted && console.error(`Error ${err.formatted}`);
		});
}