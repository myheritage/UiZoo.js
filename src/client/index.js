import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import "./components.js";
import "./documentation.js";

import {createCompiler} from './services/compileWithContext';
import {parseDocumentation} from './services/parseDocumentation';
import App from './Components/App';

const {libraryDocs = {}, libraryData = {}} = window;
const compiler = createCompiler(libraryData); // JSX compiler
const documentation = parseDocumentation(libraryDocs);

ReactDOM.render(
    <BrowserRouter basename="/">
        <Route path="/:componentName?" render={routeProps => (
            <App {...routeProps}
                components={libraryData}
                documentation={documentation}
                compiler={compiler} />
        )}/>
    </BrowserRouter>,
    document.getElementById('bibliotheca_root')
);

