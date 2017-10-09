import React from 'react';
import _ from 'underscore';
import Babel from 'babel-standalone';

export function createCompiler(context) {
    const iframe = createIframe();
    return createEvalWithContext(iframe, context);
}

export function createIframe(_document = document) {
    let iframe = _document.createElement('iframe');
    if (!iframe.style) iframe.style = {};
    iframe.style.display = 'none';
    
    _document.body.appendChild(iframe);

    return iframe;
}

export function removeIframe(iframe) {
    iframe && iframe.parent && iframe.parent.removeChild(iframe);
}

function createEvalWithContext(iframe, context = {}) {
    let win = iframe.contentWindow;
    _.extend(win, context, {React});
    
    return (input) => {
        // defensive measures
        if (typeof input !== 'string') return null;
        input = input.trim();
        if (!input) return null;
        
        const jsCode = Babel.transform(input.trim(), { presets: ['es2015', 'react'] }).code;
        return win.eval.call(win, jsCode);
    };
}