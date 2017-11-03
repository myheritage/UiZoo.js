import React from 'react';
import _ from 'underscore';

import TextField from '../../../UI/TextField';
import ErrorIndicator from '../../../UI/ErrorIndicator';
import jsxToString from '../../../../services/jsx-to-string';

const DEBOUNCE_AMOUNT = 500;
const START_WITH_TAG_REGEX = /^\s*</;

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
     * A bit of a hack - it puts initial JSX to the TextField but free it right after (by setting it immediately after to undefined)
     * The reason that "state.value" can't be just "controlled" by parent (like the String selector):
     * We do jsx -> function, function -> jsx (receiving parent selectedValue)
     * which have small differences like spacing and the text changes all the time... that is really annoying to write
     * 
     * Parent has a key prop that include the example id in it, therefore we this component will re-render on each load of an example
     */
    componentDidMount() {
        let value = this.getJsxFromValue(this.props.selectedValue);
        if (value) {
            this.setState(
                state => _.extend({}, state, {value}),
                // done updating state callback -> free up state.value
                () => this.setState(state => _.extend({}, state, {value: undefined}))
            );
        }
    }
    
    /**
     * @param {ReactElement|string} val 
     * @return {string}
     */
    getJsxFromValue(val) {
        let jsxValue;
        if (val) {
            try {
                if (Array.isArray(val)) {
                    jsxValue = '';
                    for(let i = 0, l = val.length; i < l; i++) {
                        jsxValue += this.getJsxFromValue(val[i]);
                    }
                } else {
                    jsxValue = jsxToString(val, {useFunctionCode: true});
                }
            } catch (e) {
                jsxValue = val;
            }
        }
        return jsxValue;
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
        const {compiler = _.noop, onChange = _.noop, forceOnlyJSX = false} = this.props;
        let compiledValue = value,
            error = null;

        if (forceOnlyJSX || START_WITH_TAG_REGEX.test(value)) {
            try {
                if (forceOnlyJSX) {
                    compiledValue = compiler(value);
                } else {
                    // as a hack to not mess with keys - wrapping by an element
                    compiledValue = compiler(`<i>${value}</i>`);
                    compiledValue = compiledValue.props.children;
                }
            } catch(e) {
                error = e;
            }
        }
        this.setState(state => _.extend({}, state, {error}));
        if (!error) onChange(null, compiledValue);
    }

    render() {
        return (
            <ErrorIndicator error={this.state.error}>
                <div className="library-_-jsx-selector-wrapper library-_-tooltip-error-indicator-wrapper">
                    <TextField
                        value={this.state.value}
                        onChange={this.onChange}
                        placeholder="<div>JSX</div>" /> 
                </div>
            </ErrorIndicator>
        );
    }
}