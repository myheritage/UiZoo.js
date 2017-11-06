import React from 'react';
import compileExample from '../../services/compileExample';
import Card from '../UI/Card';
import Separator from '../UI/Separator';
import { reportError } from '../../services/errorReporter';
import extractJSDocExample from '../../services/extractJSDocExample';
import './index.scss';

export const DEFAULT_EXAMPLE_INDEX = 0;

/**
 * Shows a preview of a module, show casing the components in it
 * Passing isMainModule props as 'true' will show all modules' components
 */
export default class ModulePreview extends React.Component {
    constructor(props) {
        super(props);

        this.renderModuleComponents = this.renderModuleComponents.bind(this);
    }

    /**
     * @param {String} componentName The components name
     */
    renderComponentPreviewCard(componentName) {
        const {goToUrl, compiler} = this.props;
        const componentDoc = this.props.documentations[componentName] || {};
        const ComponentNode = this.props.components[componentName] || null;
        
        const componentDefaultExample = extractJSDocExample(componentDoc, DEFAULT_EXAMPLE_INDEX);
        // try to compile an example, if it didn't work - at least show something
        const componentContent = compileExample(componentDefaultExample, compiler) || (<ComponentNode />);

        const description = componentDoc.description && componentDoc.description[0]
            ? componentDoc.description[0].description
            : '';

        return (
            <div className='library-_-component-preview-card-container'>
                <Card className='library-_-component-preview-card'>
                    <div className='library-_-component-preview-name'
                        onClick={() => goToUrl(componentName)}>
                        {componentName}
                    </div>
                    <div className='library-_-component-preview-description'>
                        {description}
                    </div>
                    <div className='library-_-component-preview-label'>Preview:</div>
                    <div className='library-_-component_preview_container'>
                        {componentContent}
                    </div>
                </Card>
            </div>
        );
    }

    /**
     * Render a single module view
     * @param {Array} moduleName 
     */
    renderModuleComponents(moduleName) {
        const {componentsByModule, goToUrl, isMainModule} = this.props;
        const moduleComponents = componentsByModule[moduleName];

        // Only show module name if showing all modules in library
        const moduleNameElement = isMainModule &&
            <div className='library-_-module-preview-name'
                onClick={() => goToUrl(moduleName)}>
                {moduleName} - Components
            </div>;

        return (
            <div className='library-_-module-components-container'>
                {moduleNameElement}
                {_.keys(moduleComponents).map(currComponentName =>
                    this.renderComponentPreviewCard(currComponentName))}
                    {isMainModule && <Separator/>}
            </div>
        )
    }

    render() {
        const {moduleName, componentsByModule, isMainModule = false} = this.props;
        const modules = isMainModule ? _.keys(componentsByModule) : [moduleName];

        return (
            <div className='library-_-module-preview'>
                <div className='library-_-module-title'>
                    {moduleName} - Components
                </div>
                {modules.map(this.renderModuleComponents)}
            </div>
        );
    }
}