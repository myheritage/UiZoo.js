import React from "react";
import "./index.scss";

const OPEN_STATE_CLASS = "accordion_open";

/**
 * @name
 * Accordion
 * 
 * @description 
 * Lalalalallalala
 * 
 * @example
 * <Accordion title="Schnitzel">
 *  <div class="content">
 *  Schnitzel is open!!!!1
 *  </div> 
 * </Accordion>
 * 
 * @param {string} title title
 * @param {boolean} isOpen is open
 * @param {function} onChange sdfsdaf
 * @param {node} children sdfsafd
 */
export default class Accordion extends React.Component {
    constructor(props) {
        super(props);

        this.toggleOpenState = this.toggleOpenState.bind(this);

        this.state = {
            isOpen: props.isOpen,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isOpen !== this.props.isOpen && nextProps.isOpen !== this.state.isOpen) {
            this.toggleOpenState();
        }
    }

    /**
     * Change the text area to the actual text size
     * @param {*} e 
     */
    updateContentMaxHeight(isOpen) {
        let newMaxHeight = 0;
        if (isOpen) {
            this.contentContainterRef.style.maxHeight = "auto";
            newMaxHeight = this.contentRef.clientHeight + 500;
        }

        this.contentContainterRef.style.maxHeight = newMaxHeight;
    }

    toggleOpenState() {
        this.setState(currentState => {
            currentState.isOpen = !currentState.isOpen;

            this.updateContentMaxHeight(currentState.isOpen);
            this.props.onChange && this.props.onChange(currentState.isOpen);
            return currentState;
        });
    }

    render() {
        return (
            <div className={`accordion_container ${this.state.isOpen ? OPEN_STATE_CLASS : ''}`}>
              
                <div className="accordion_title" onClick={this.toggleOpenState}>{this.props.title}</div>
                <div className="accordion_content_container" ref={contentContainterRef => this.contentContainterRef = contentContainterRef}>
                    <div className="accordion_content" ref={contentRef => this.contentRef = contentRef}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}