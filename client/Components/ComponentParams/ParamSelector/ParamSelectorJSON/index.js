import React from 'react';
import _ from 'underscore';

import TextField from '../../../BibliothecaUI/TextField';
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
            value: props.selectedValue
        };
        this.onChange = this.onChange.bind(this);
        this.reportChangeBounced = _.debounce(val => this.reportChange(val), 150);
    }

    /**
     * Update state.value as string when nextProps.selectedValue has changed
     * @param {object} nextProps 
     */
    componentWillReceiveProps(nextProps) {
        const nextStringifiedValue = JSON.stringify(nextProps.selectedValue);
        if (nextStringifiedValue !== JSON.stringify(this.props.selectedValue)) {
            // Check if should ignore React children, will be fixed with Live Coding feature
            if (typeof nextProps.selectedValue === 'object' && nextProps.selectedValue.hasOwnProperty('ref')
                && nextProps.selectedValue.hasOwnProperty('type') && nextProps.selectedValue.hasOwnProperty('props')) {
                this.setState({value: ''});
            } else {
                if (typeof nextProps.selectedValue === 'string') {
                    this.setState({value: nextProps.selectedValue});
                } else  {
                    this.setState({value: nextStringifiedValue});
                }
            }
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
            <div className="bibliotheca-json-selector-wrapper">
                <TextField
                    value={this.state.value}
                    onChange={this.onChange}
                    placeholder="string, array, etc" /> 
            </div>
        );
    }
}