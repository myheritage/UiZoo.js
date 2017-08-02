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
import mapComponentsByModule from "./services/componentByModuleMapper";
import ErrorReporter from "./services/errorReporter";

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
    rootElement = defaultRoot,
    baseRoute = '/',
) {
    checkDependencies(bibliothecaDocumentation, bibliothecaComponents);

    const compiler = createCompiler(bibliothecaComponents); // JSX compiler
    const documentations = parseDocumentation(bibliothecaDocumentation);
    const componentsByModule = mapComponentsByModule(bibliothecaComponents, documentations);

    ReactDOM.render(
        <BrowserRouter basename="/">
            <Route path={`${baseRoute}:componentName?`} render={routeProps => (
                <App {...routeProps}
                    components={bibliothecaComponents}
                    componentsByModule={componentsByModule}
                    documentations={documentations}
                    compiler={compiler}
                    baseRoute={baseRoute} />
            )} />
        </BrowserRouter>,
        rootElement
    );
}

export default { init };