import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import {MuiThemeProvider} from 'material-ui';
import MasterPage from './Components/MasterPage';
import injectTapEventPlugin from 'react-tap-event-plugin';

import './index.scss';

// Needed for onTouchTap 
// http://stackoverflow.com/a/34015469/988941 
injectTapEventPlugin();

// TODO: this is horrible
window.React = React;

ReactDOM.render(
    <MuiThemeProvider>
        <BrowserRouter basename="/">
            <Route path="/:componentName?" component={MasterPage} />
        </BrowserRouter>
    </MuiThemeProvider>,
    document.getElementById('bibliotheca_root')
);

