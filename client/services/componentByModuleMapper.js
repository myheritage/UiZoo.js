import { NON_MODULE_NAME } from "../constants/modules";

/**
 * Creates a map object mapping module names to arrays holding their components' constructors
 * 
 * @param {*} components 
 * @param {*} documentations 
 */
export default function mapComponentsByModule(components, documentations) {
    let componentsByModule = {};
    
    _.each(components, (componentData, componentName) => {
<<<<<<< HEAD
        if (documentations[componentName]) {
            let moduleName = (documentations[componentName].module && documentations[componentName].module[0].name) || NON_MODULE_NAME;
            componentsByModule[moduleName] = [].concat(componentsByModule[moduleName], componentData);
        }
=======
        let moduleName = (documentations[componentName].module && documentations[componentName].module[0].name) || NON_MODULE_NAME;
        componentsByModule[moduleName] = [].concat(componentsByModule[moduleName]||[], componentData);
>>>>>>> 56d57eda9e76a44da3c47f3687e3a0411fb8ffaa
    });

    return componentsByModule;
}