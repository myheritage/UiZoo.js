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
 * Text Field with adjustable height
 * It will lengthen the textarea up to 5 rows based on the content in it
 * use props.value to control the component.
 * Try writing in it!
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
     * Set initial height of the text area
     */
    componentDidMount() {
        window.requestAnimationFrame(() => { // reading in the start of the next frame for the correct scrollHeight
            this.setTextareaHeight();
        });
    }

    /**
     * Set the textarea height from the scroll height
     */
    setTextareaHeight() {
        if (this.textarea) {
            this.textarea.style.height = `${this.textarea.scrollHeight || 0}px`;
        }
    }
    
    /**
     * Change the text area to the actual text size
     * @param {*} e 
     */
    textAreaChanged(e) {
        // needed to set 'auto' for redrawing to get the correct scroll height
        this.textarea.style.height = 'auto';
        this.setTextareaHeight();
        this.props.onChange(e);
    }

    render() {
        return (
            <div className={`library-_-text-field${this.state.className}`}>
                <textarea
                    className="library-_-text-field-input"
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