import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import "./components.js";
import "./documentation.js";

import {createCompiler} from './services/compileWithContext';
import App from './Components/App';

const {libraryConfiguration = {}, libraryData = {}} = window; // server-side rendered data
const {components, documentation} = libraryConfiguration;
const compiler = createCompiler(libraryData); // JSX compiler

ReactDOM.render(
    <BrowserRouter basename="/">
        <Route path="/:componentName?" render={routeProps => (
            <App {...routeProps}
                components={components}
                documentation={documentation}
                compiler={compiler} />
        )}/>
    </BrowserRouter>,
    document.getElementById('bibliotheca_root')
);

