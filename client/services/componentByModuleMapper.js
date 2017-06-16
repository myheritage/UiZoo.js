import { NON_MODULE_NAME } from "../constants/modules";

/**
 * Creats a map object mapping module names to arrays holding their components' constructors
 * 
 * @param {*} components 
 * @param {*} documentations 
 */
export default function mapComponentsByModule(components, documentations) {
    let componentsByModule = {};

    _.each(components, (componentData, componentName) => {
        let moduleName = (documentations[componentName].module && documentations[componentName].module[0].name) || NON_MODULE_NAME;
        componentsByModule[moduleName] = [].concat(componentsByModule[moduleName], componentData);
    });

    return componentsByModule;
}