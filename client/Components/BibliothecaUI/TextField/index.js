import React from 'react';
import './index.scss';

/**
 * @name
 * TextField
 * 
 * @description
 * Text Field
 * 
 * @example
 * // Without value
 * <TextField
 *      placeholder="Placeholder Text"
 *      onChange={(e) => console.log('TextField was changed with value: ', e.target.value)}/>
 * 
 * @example
 * // With controlled value, change only from the parent
 * <TextField
 *      value="Can't change this"
 *      onChange={(e) => console.log('TextField was changed with value: ', e.target.value)}/>
 * 
 * @param {string} [placeholder] value as a placeholder until user input another value
 * @param {string} [value] current value of the text field
 * @param {function} onChange
 */
export default class TextField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {className: ''};
    }

    render() {
        return (
            <div className={`bibliotheca-text-field${this.state.className}`}>
                <textarea
                    onFocus={() => this.setState({className:' is-focused'})}
                    onBlur={() => this.setState({className:''})}
                    tabIndex="1"
                    rows="1"
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    onChange={e => this.props.onChange(e)}/>
            </div>
        );
    }

}