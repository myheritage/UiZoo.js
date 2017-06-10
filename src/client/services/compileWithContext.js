import React from 'react';
import _ from 'underscore';

export function createCompiler(context) {
    const iframe = createIframe();
    return createEvalWithContext(iframe, context);
}

function createIframe(_document = document) {
    let iframe = _document.createElement('iframe');
    if (!iframe.style) iframe.style = {};
    iframe.style.display = 'none';
    
    _document.body.appendChild(iframe);

    return iframe;
}

function createEvalWithContext(iframe, context = {}) {
    let win = iframe.contentWindow;
    _.extend(win, context, {React});
    return (input) => {
        const jsCode = Babel.transform(input, { presets: ['es2015', 'react'] }).code;
        return win.eval.call(win, jsCode);
    };
}