import React from 'react';
import _ from 'underscore';

import TextField from '../../../UI/TextField';
import Tooltip from '../../../UI/Tooltip';

import './index.scss';

const DEBOUNCE_AMOUNT = 500;

/**
 * @description
 * open input for jsx values. will try to eval value and fallback to string if error occurred
 * 
 * @param {function} onChange report parent on a change
 * @param {function} compiler jsx eval compiler
 */
export default class ParamSelectorJSX extends React.Component {
    constructor(props) {
        super(props);
        this.state = {error: null};
        this.onChange = this.onChange.bind(this);
        this.reportChangeBounce = _.debounce(v => this.reportChange(v), DEBOUNCE_AMOUNT);
    }

    /**
     * Will update the new value from the event.
     * sadly the event cannot be sent as a whole because we debounce
     * @param {event} e 
     */
    onChange(e) {
        this.reportChangeBounce(e.target.value);
    }

    /**
     * report to parent onChange, this function is debounce to be reportChangeBounce
     * @param {Object} event 
     */
    reportChange(value) {
        const {compiler = _.noop, onChange = _.noop} = this.props;
        let compiledValue, error = null;
        try {
            compiledValue = compiler(value);
        } catch(e) {
            compiledValue = value; // set as string instead
            error = e;
        }
        this.setState(state => _.extend({}, state, {error}));
        onChange(null, compiledValue);
    }

    /**
     * Create an error tooltip to show the latest compilation error in a tooltip
     */
    renderErrorTooltip() {
        return (
            <div className="library-_-error-indicator-wrapper">
                <Tooltip tooltip={<pre>{this.state.error.toString()}</pre>}>
                    <div className="library-_-error-indicator" />
                </Tooltip>
            </div>
        );
    }

    render() {
        return (
            <div className="library-_-jsx-selector-wrapper">
                {this.state.error ? this.renderErrorTooltip() :  null}
                <TextField
                    onChange={this.onChange}
                    placeholder="<div>JSX</div>" /> 
            </div>
        );
    }
}