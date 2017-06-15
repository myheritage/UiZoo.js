import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import libraryData from './components';
import libraryDocs from './documentation';
import { checkDependencies } from './services/checkHealth';
import { createCompiler } from './services/compileWithContext';
import { parseDocumentation } from './services/parseDocumentation';
import App from './Components/App';
import { NON_MODULE_NAME } from "./constants/modules";

const defaultRoot = document.getElementById('bibliotheca_root');

/**
 * Init the Bibliotheca
 * @param {Object} bibliothecaDocumentation
 * @param {Object} bibliothecaComponents
 * @param {HTMLElement} rootElement
 */
function init(
    bibliothecaDocumentation = libraryDocs,
    bibliothecaComponents = libraryData,
    rootElement = defaultRoot
) {
    checkDependencies(bibliothecaDocumentation, bibliothecaComponents);
    const compiler = createCompiler(bibliothecaComponents); // JSX compiler
    const documentations = parseDocumentation(bibliothecaDocumentation);

    let componentsByModule = {};

    _.each(bibliothecaComponents, (componentData, componentName) => {
        let modulename = (documentations[componentName].module && documentations[componentName].module[0].name) || NON_MODULE_NAME;
        componentsByModule[modulename] = [].concat(componentsByModule[modulename], componentData);
    });

    ReactDOM.render(
        <BrowserRouter basename="/">
            <Route path="/:componentName?" render={routeProps => (
                <App {...routeProps}
                    components={bibliothecaComponents}
                    componentsByModule={componentsByModule}
                    documentations={documentations}
                    compiler={compiler} />
            )} />
        </BrowserRouter>,
        rootElement
    );
}

export default { init };