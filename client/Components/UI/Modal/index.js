import React from 'react';
import Card from '../Card';
import _ from 'underscore';

import './index.scss';

/**
 * @name
 * Modal
 * 
 * @module
 * Content
 * 
 * @description
 * Change isOpen to open/close the modal
 * 
 * @example
 * <Modal className="modal_class_name" title="title">
 *  inner modal content
 * </Modal>
 * 
 * @param {boolean} [isOpen] change to open/close the modal
 * @param {string} title the modal title
 * @param {node} children the modal content
 * @param {function} onChange will execute the callback on change with the new value
 */
export default class Modal extends React.Component {
    /**
     * Modal constructor
     */
    constructor(props) {
        super(props);
        this.state = {isOpen: props.isOpen || false};
        this.toggleOpenState = this.toggleOpenState.bind(this);
    }

    /**
     * Checks if the isOpen props has changed from the last value and update the state accordingly
     * @param {Object} nextProps
     */
    componentWillReceiveProps(nextProps) {
        // If new props contain a different isOpen state than current, change it
        if (nextProps.isOpen !== this.props.isOpen && nextProps.isOpen !== this.state.isOpen) {
            this.setState(state => _.extend({}, state, {isOpen: nextProps.isOpen}));
        }
    }

    toggleOpenState() {
        this.props.onChange && this.props.onChange(!this.state.isOpen);
        this.setState(state => _.extend({}, state, {isOpen: !state.isOpen}));
    }

    /**
     * Modal render function
     */
    render() {
        const { children, className, title } = this.props;

        return this.state.isOpen ? (
            <div>
                <Card className={`library-_-modal-container${className ? ` ${className}` : ''}`}>
                    <h2 className="library-_-modal-title">{title}</h2>
                    <div className="library-_-modal-close-button" onClick={this.toggleOpenState}></div>
                    <div className="library-_-modal-content-container">
                        {children}
                    </div>
                </Card>
                <div className="library-_-modal-frame" onClick={this.toggleOpenState} />
            </div>
        ) : null;
    }
}