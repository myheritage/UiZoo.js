import React from "react";
import ReactDOM from "react-dom";

import {BrowserRouter, Route} from "react-router-dom";

import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import "./index.scss";

// Needed for onTouchTap 
// http://stackoverflow.com/a/34015469/988941 
injectTapEventPlugin();

import MasterPage from "./Components/MasterPage";

window.React = React;

ReactDOM.render(
    <MuiThemeProvider>
        <BrowserRouter basename="/">
            <Route path="/:componentName" component={MasterPage} />
        </BrowserRouter>
    </MuiThemeProvider>,
    document.getElementById('bibliotecha_root')
);

