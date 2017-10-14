import React from 'react';
import './index.scss';

const OPEN_STATE_CLASS = 'library-_-collapsible-open';

/**
 * @name
 * Collapsible
 * 
 * @module
 * Content
 *
 * @description
 * An element that can be closed or opened by clicking on the title
 *
 * @example
 * // Example with some style minimalism
 * <Collapsible
 *      title="Click me to open/close the content"
 *      style={{border: "1px solid", padding: "15px"}}
 *      contentStyle={{paddingTop: "15px"}}>
 *      This is the content
 * </Collapsible>
 *
 * @param {node} title clickable string/element to open/close the content
 * @param {node} children inner content of the Collapsible
 * @param {boolean} [isOpen=true] to control the Collapsible from the outside by passing a boolean value
 * @param {function} [onChange] callback for change of the content state
 * @param {object} [style] outer style of the element
 * @param {object} [titleStyle] the style of the title only
 * @param {object} [contentStyle] the title of the content only
 */
export default class Collapsible extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: this.isOpen(props)
        };

        this.toggleOpenState = this.toggleOpenState.bind(this);
    }

    /**
     * Checks if the isOpen props has changed from the last value and update the state accordingly
     * @param {Object} nextProps
     */
    componentWillReceiveProps(nextProps) {
        if (this.state.isOpen !== this.isOpen(nextProps)) {
            this.toggleOpenState();
        }
    }

    componentDidMount() {
        this.updateContentMaxHeight(this.state.isOpen);
    }

    /**
     * @param {Object} props 
     */
    isOpen(props) {
        return props.isOpen || props.isOpen === undefined;
    }

    /**
     * Change content container max-height style value for cool animation
     * @param {boolean} isOpen
     */
    updateContentMaxHeight(isOpen) {
        let newMaxHeight = isOpen ? this.contentRef.clientHeight + 500 : 0;
        this.contentContainerRef.style.maxHeight = `${newMaxHeight}px`;
    }

    /**
     *  Open/Close the element
     */
    toggleOpenState() {
        this.setState(currentState => {
            currentState.isOpen = !currentState.isOpen;
            this.updateContentMaxHeight(currentState.isOpen);
            this.props.onChange && this.props.onChange(currentState.isOpen);
            return currentState;
        });
    }

    /**
     * Render function
     */
    render() {
        const addedClassName = this.state.isOpen ? OPEN_STATE_CLASS : '';

        return (
            <div
                className={`library-_-collapsible-container ${addedClassName}`}
                style={this.props.style}>
                <button
                    tabIndex="1"
                    className="library-_-collapsible-title"
                    onClick={this.toggleOpenState}
                    style={this.props.titleStyle}>
                    {this.props.title}
                </button>
                <div
                    className="library-_-collapsible-content-container"
                    ref={contentContainerRef => this.contentContainerRef = contentContainerRef}>
                    <div
                        className="library-_-collapsible-content"
                        ref={contentRef => this.contentRef = contentRef}
                        style={this.props.contentStyle}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}