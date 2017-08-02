import React from 'react';
import _ from 'underscore';

import TextField from '../../../UI/TextField';
import tryToParseJson from './tryToParseJson';

/**
 * @description
 * open input for JSON/string values. will try to parse as JSON and fallback to string.
 * 
 * @param {any} [selectedValue]
 * @param {function} onChange
 */
export default class ParamSelectorJSON extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.getNextValue(props.selectedValue, JSON.stringify(props.selectedValue))
        };
        this.onChange = this.onChange.bind(this);
        this.reportChangeBounced = _.debounce(val => this.reportChange(val), 150);
    }

    /**
     * Check if React children to ignore since we cannot update those directly to the example,
     * Will be fixed with "Live Coding" feature
     * @param {any} item 
     * @returns {boolean}
     */
    isReactObject(item) {
        return typeof item === 'object' && item.hasOwnProperty('ref')
            && item.hasOwnProperty('type') && item.hasOwnProperty('props');
    }

    /**
     * Check between value and stringifiedValue, which one should we use
     * @param {any} value 
     * @param {string} stringifiedValue 
     * @return {string} value to set in state
     */
    getNextValue(value, stringifiedValue) {
        let newValue;
        if (this.isReactObject(value) || (Array.isArray(value) && this.isReactObject(value[0]))) {
            newValue = '';
        } else {
            // check if string to not add quotes around the string
            if (typeof value === 'string') {
                newValue = value;
            } else  {
                newValue = stringifiedValue;
            }
        }
        return newValue
    }

    /**
     * Update state.value as string when nextProps.selectedValue has changed
     * @param {object} nextProps 
     */
    componentWillReceiveProps(nextProps) {
        const nextStringifiedSelectedValue = JSON.stringify(nextProps.selectedValue);
        // check if the selectedValue even changed
        if (nextStringifiedSelectedValue !== JSON.stringify(this.props.selectedValue)) {
            const value = this.getNextValue(nextProps.selectedValue, nextStringifiedSelectedValue);
            this.setState({value});
        }
    }

    /**
     * Will update the new value from the event.
     * sadly the event cannot be sent to the parent onChange because we debounce the onChange
     * @param {event} e 
     */
    onChange(e) {
        const newValue = e.target.value;
        this.setState({value: newValue});
        this.reportChangeBounced(newValue);
    }

    /**
     * report to parent onChange, this function is debounced to be reportChangeBounced
     * @param {string} val 
     */
    reportChange(val) {
        val = tryToParseJson(val);
        this.props.onChange && this.props.onChange(null, val);
    }

    /**
     * render the text field
     */
    render() {
        return (
            <div className="library-_-json-selector-wrapper">
                <TextField
                    value={this.state.value}
                    onChange={this.onChange}
                    placeholder="string, array, etc" /> 
            </div>
        );
    }
}