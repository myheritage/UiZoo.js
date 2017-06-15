import React from 'react';
import './index.scss';

/**
 * @name
 * TextField
 * 
 * @module
 * Inputs
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
        this.state = { className: '' };
        this.textAreaChanged = this.textAreaChanged.bind(this);
    }

    /**
     * Change the text area to the actual text size
     * @param {*} e 
     */
    textAreaChanged(e) {
        this.textarea.style.height = "auto";
        this.textarea.style.height = this.textarea.scrollHeight;
        
        this.props.onChange(e);
    }

    render() {
        return (
            <div className={`bibliotheca-text-field${this.state.className}`}>
                <textarea
                    className="bibliotecha-text-field-input"
                    rows="1"
                    tabIndex="1"
                    ref={textarea => this.textarea = textarea}
                    onFocus={() => this.setState({ className: ' is-focused' })}
                    onBlur={() => this.setState({ className: '' })}
                    onChange={this.textAreaChanged}
                    placeholder={this.props.placeholder}
                    value={this.props.value} />
            </div>
        );
    }

}