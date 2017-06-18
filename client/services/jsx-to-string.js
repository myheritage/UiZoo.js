import React from 'react';
import _ from 'underscore';

function isDefaultProp (defaultProps, key, value) {
    if (!defaultProps) {
        return false;
    }
    return defaultProps[key] === value;
}

function stringifyObject (object, opts) {
    let result;
    if (Array.isArray(object)) {
        result = object.map(item => stringifyObject(item));
    } else if (object && typeof object === 'object') {
        result = {};
        _.keys(object).map(key => {
            let value = object[key];
            if (React.isValidElement(value)) {
                value = jsxToString(value, opts);
            } else if (Array.isArray(value)) {
                value = value.map(item => stringifyObject(item, opts));
            } else if (typeof value === 'object') {
                value = stringifyObject(value, opts);
            } else if (typeof value === 'function') {
                value = opts.useFunctionCode ?
                    opts.functionNameOnly ?
                        item.name.toString() : item.toString() : `...`;
            }
            result[key] = value;
        });
    } else {
        result = object;
    }
    return result;
}

const _JSX_REGEXP = /"<.+>"/g;

function serializeItem (item, options, delimit=true) {
    let result;
    if (typeof item === 'string') {
        result = delimit ? `'${item}'` : item;
    } else if (typeof item === 'number' || typeof item === 'boolean') {
        result = `${item}`;
    } else if (Array.isArray(item)) {
        var indentation = new Array(options.spacing + 1).join(' ');
        const delimiter = delimit ? ', ' : `\n${indentation}`;
        const items = item.map(i => serializeItem(i, options)).join(delimiter);
        result = delimit ? `[${items}]` : `${items}` ;
    } else if (React.isValidElement(item)) {
        result = jsxToString(item, options);
    } else if (typeof item === 'object') {
        result = JSON.stringify(stringifyObject(item, options));
        // remove string quotes from embeded JSX values
        result = result.replace(_JSX_REGEXP, function (match) {
            return match.slice(1, match.length - 1);
        });
    } else if (typeof item === 'function') {
        result = options.useFunctionCode ?
            options.functionNameOnly ?
                item.name.toString() : item.toString() : `...`;
    }
    return result;
}

function jsxToString (component, options) {

    const baseOpts = {
        displayName: component.type.displayName || component.type.name ||
        component.type,
        ignoreProps: [],
        keyValueOverride: {},
        spacing: 0,
        detectFunctions: false
    };

    const opts = _.extend({},baseOpts,options);

    const componentData = {
        name: opts.displayName
    };

    delete opts.displayName;

    if (component.props) {
        const indentation = new Array(opts.spacing + 3).join(' ');
        componentData.props = _.keys(component.props)
            .filter(key => {
                return (key !== 'children' &&
                ! isDefaultProp(component.type.defaultProps, key,
                    component.props[key]) &&
                opts.ignoreProps.indexOf(key) === -1)
            }).map(key => {
                let value;

                if (typeof opts.keyValueOverride[key] === 'function') {
                    value = opts.keyValueOverride[key](component.props[key]);
                } else if (opts.keyValueOverride[key]) {
                    value = opts.keyValueOverride[key]
                } else {
                    value = serializeItem(component.props[key], _.extend({}, opts, {key}));
                }

                if (typeof value !== 'string' || value[0] !== "'") {
                    value = `{${value}}`;
                }
                return `${key}=${value}`;
            }).join(`\n${indentation}`);
        if (component.key) {
            componentData.props += `key='${component.key}'`;
        }

        if (componentData.props.length > 0) {
            componentData.props = ' ' + componentData.props;
        }
    }

    if (component.props.children) {
        opts.spacing += 2;
        const indentation = new Array(opts.spacing + 1).join(' ');
        if (Array.isArray(component.props.children)) {
            componentData.children = component.props.children
                .reduce((a, b) => a.concat(b), []) // handle Array of Arrays
                .filter(child => child)
                .map(child => serializeItem(child, opts, false))
                .join(`\n${indentation}`);
        } else {
            componentData.children =
                serializeItem(component.props.children, opts, false);
        }
        return `<${componentData.name}${componentData.props}>\n` +
            `${indentation}${componentData.children}\n` +
            `${indentation.slice(0, -2)}</${componentData.name}>`;
    } else {
        return `<${componentData.name}${componentData.props} />`;
    }
}

export default jsxToString;