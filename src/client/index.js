import "./index.scss";

import {BrowserRouter, Route} from "react-router-dom";

import MasterPage from "./Components/MasterPage";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from "react";
import ReactDOM from "react-dom";
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap 
// http://stackoverflow.com/a/34015469/988941 
injectTapEventPlugin();


window.React = React;

ReactDOM.render(
    <MuiThemeProvider>
        <BrowserRouter basename="/">
            <Route path="/:componentName?" component={MasterPage} />
        </BrowserRouter>
    </MuiThemeProvider>,
    document.getElementById('bibliotecha_root')
);

