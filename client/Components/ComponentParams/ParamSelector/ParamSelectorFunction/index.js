import React from 'react';
import _ from 'underscore';

import TextField from '../../../UI/TextField';

const DEBOUNCE_AMOUNT = 300;

/**
 * @description
 * open input for function values. will try to eval value and fallback to default function.
 * 
 * @param {function} onChange
 */
export default class ParamSelectorFunction extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.reportChangeBounced = _.debounce(val => this.reportChange(val), DEBOUNCE_AMOUNT);
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
        let func;
        try {
            func = compiler(val);
        } catch(e){
            func = () => console.error(`Failed in compilation of '${name}' prop, full error:\n\n`, e);
        }
        onChange(null, func);
    }

    render() {
        return (
            <div className="library-_-function-selector-wrapper">
                <TextField
                    onChange={this.onChange}
                    placeholder="(e) => console.log(e)" /> 
            </div>
        );
    }
}