import {Component} from 'react';
import TextField from '../../../BibliothecaUI/TextField';
import {tryToEvalFunction} from './tryToEval';

/**
 * @description
 * open input for function values. will try to eval value and fallback to default function.
 * 
 * @param {function} onChange
 */
export default class ParamSelectorFunction extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.reportChangeBounced = _.debounce(val => this.reportChange(val), 300);
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
        let func = tryToEvalFunction(val);
        this.props.onChange && this.props.onChange(null, func);
    }

    render() {
        return (
            <div className="bibliotheca-function-selector-wrapper">
                <TextField
                    onChange={this.onChange}
                    placeholder="(e) => console.log.." /> 
            </div>
        );
    }
}

/**
 * @param {*} fn 
 */
function tryToStringifyFunction(fn) {
    let stringifiedFunction;
    let typeOfFn = typeof fn;
    try {
        if (typeOfFn === 'function' || typeOfFn === 'string') {
            stringifiedFunction = fn.toString();
        }
    } catch(e) {}
    return stringifiedFunction;
}