import { NON_MODULE_NAME } from '../constants/modules';
import _ from 'underscore';

/**
 * Creates a map object mapping module names to named objects holding their components' constructors
 * 
 * @param {*} components 
 * @param {*} documentations 
 */
export default function mapComponentsByModule(components, documentations) {
    let componentsByModule = {};
    
    _.each(components, (componentData, componentName) => {
        if (documentations[componentName]) {
            let moduleName = (documentations[componentName].module && documentations[componentName].module[0].name) || NON_MODULE_NAME;
            componentsByModule[moduleName] = _.extend({[componentName]: componentData}, componentsByModule[moduleName]);
        }
    });

    return componentsByModule;
}