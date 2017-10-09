import React from 'react';

let errorList = [];

/**
 * Report error
 * @param {String|Error} message
 * @param {Array|String} args
 */
export function reportError(message, args) {
    console.error(message, args);
    if (message instanceof Error) {
        errorList.push(
            (<div>
                <pre>{message.toString()}</pre><br/>
                {args ? args.toString() : ''}
            </div>)
        );
    } else {
        errorList.push(`${message}${args ? ` ${args}` : ''}`);
    }
}

/**
 * Get errors
 */
export function getErrors() {
    return errorList;
}

/**
 * Get errors
 */
export function hasErrors() {
    return errorList.length > 0;
}