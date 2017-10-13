import React from 'react';
import _ from 'underscore';

import TextField from '../../../UI/TextField';
import ErrorIndicator from '../../../UI/ErrorIndicator';

const DEBOUNCE_AMOUNT = 300;

/**
 * @description
 * open input for object values. will try to eval value and fallback to undefined.
 * 
 * @param {function} onChange
 */
export default class ParamSelectorObject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {error: null};
        this.onChange = this.onChange.bind(this);
        this.reportChangeBounced = _.debounce(val => this.reportChange(val), DEBOUNCE_AMOUNT);
    }

    /**
     * A bit of a hack - it puts initial Object to the TextField but free it right after
     * (by setting it immediately after to undefined)
     */
    componentDidMount() {
        let value = JSON.stringify(this.props.selectedValue);
        if (value) {
            this.setState(
                state => _.extend({}, state, {value}),
                () => this.setState(state => _.extend({}, state, {value: undefined}))
            );
        }
    }

    /**
     * Will update the new value from the event.
     * sadly the event cannot be sent to the parent onChange because we debounce the onChange
     * @param {event} e 
     */
    onChange(e) {
        const newValue = e.target.value;
        this.reportChangeBounced(newValue);
    }

    /**
     * report to parent onChange, this function is debounced to be reportChangeBounced
     * @param {string} val 
     */
    reportChange(val) {
        const {name, compiler = _.noop, onChange = _.noop} = this.props;
        let obj, error = null;
        try {
            obj = compiler(`Object(${val})`);
        } catch (e) {
            error = e;
        }
        this.setState(state => _.extend({}, state, {error}));
        onChange(null, obj);
    }

    render() {
        return (
            <ErrorIndicator error={this.state.error}>
                <div className="library-_-object-selector-wrapper">
                    <TextField
                        value={this.state.value}
                        onChange={this.onChange}
                        placeholder="{ object: ... }" /> 
                </div>
            </ErrorIndicator>
        );
    }
}