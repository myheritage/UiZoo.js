import React from "react";

import "./index.scss";
import Card from "../Card";

/**
 * @name
 * Modal
 * 
 * @module
 * Modals
 * 
 * @example
 * <Modal>
 *  <div className="biblio-modal" isOpen={true}>
 *  </div>
 * </Modal
 */
export default class Modal extends React.Component {
    /**
     * Modal constructor
     * @param {*} props 
     */
    constructor(props) {
        super(props);

        const { isOpen = false } = props;

        this.state = {
            isOpen,
        }

        this.toggleOpenState = this.toggleOpenState.bind(this);
    }

    /**
     * Checks if the isOpen props has changed from the last value and update the state accordingly
     * @param {Object} nextProps
     */
    componentWillReceiveProps(nextProps) {
        // If new props contain a different isOpen state than current, change it
        if (nextProps.isOpen !== this.props.isOpen && nextProps.isOpen !== this.state.isOpen) {
            this.toggleOpenState();
        }
    }

    toggleOpenState() {
        this.setState(state => {
            state.isOpen = !state.isOpen;
            return state;
        });
    }

    /**
     * Modal render function
     */
    render() {
        const { children, className, title } = this.props;
        const titleElement = title ? (<h2 className="modal-title">{title}</h2>) : null;

        if (!this.state.isOpen) {
            return null;
        }

        return (
            <Card className={`modal-container${className ? ` ${className}` : ''}`}>
                {titleElement}
                <div className="modal-close-button" onClick={this.toggleOpenState}></div>
                <div className="modal-content-container">
                    {children}
                </div>
            </Card>
        )
    }
}