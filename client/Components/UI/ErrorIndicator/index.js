import React from 'react';

import Tooltip from '../Tooltip';
import './index.scss';

/**
 * @name
 * ErrorIndicator
 * 
 * @module
 * Content
 * 
 * @description
 * Show an error tooltip on a container
 * 
 * @example
 * <ErrorIndicator error={new Error('message')}>
 *      My error-full content
 * </ErrorIndicator>
 * 
 * @param {node} children
 * @param {String|Error} [error]
 */
export default function ErrorIndicator ({children, error}) {
    return (
        <div className="library-_-tooltip-error-indicator-wrapper">
            {error ? (<div className="library-_-error-indicator-wrapper">
                <Tooltip tooltip={<pre>{error.toString && error.toString()}</pre>}>
                    <div className="library-_-error-indicator" />
                </Tooltip>
            </div>) : null}
            {children}
        </div>
    );
}