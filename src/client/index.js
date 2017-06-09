import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';

import App from './Components/App';

const {libraryConfiguration = {}} = window; // server-side rendered data
const {components, documentation} = libraryConfiguration;

ReactDOM.render(
    <BrowserRouter basename="/">
        <Route path="/:componentName?" render={routeProps => (
            <App {...routeProps} components={components} documentation={documentation} />
        )}/>
    </BrowserRouter>,
    document.getElementById('bibliotheca_root')
);

