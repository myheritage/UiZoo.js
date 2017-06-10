import React from 'react';
import {SIDES, SIDE_TOP, ALIGNMENTS, ALIGNMENT_CENTER, TRIGGER_EVENTS, TRIGGER_EVENT_HOVER} from './constants';
import './index.scss';
/**
 * @description
 * Tooltip to be shown on hover or click events.
 * Wrap children to give them the tooltip upon them.
 *
 * Consider using the AutoLocationTooltip instead of directly using tooltip
 *
 * Note: the ".tooltip_wrapper" element is "display:block" by default,
 * you may want to override this in your stylesheet if relevant
 *
 * @example
 * 1) Top side tooltip
 * <Tooltip tooltip={'tooltip inner text!'} side="top" alignment="start" trigger="hover">
 *     <span>Text to open the tooltip upon</span>
 * </Tooltip>
 *
 * 2) Bottom side tooltip
 * <Tooltip tooltip={'tooltip inner text!'} side="bottom" alignment="start">
 *     <span>Text to open the tooltip upon</span>
 * </Tooltip>
 *
 * @param {*} [tooltip] tooltip inner content, can be text or elements
 * @param {"top"|"bottom"} [side="top"] the placements of the tooltip relative to the element
 * @param {"center"|"start"|"end"} [alignment="center"] the alignment of the tooltip relative to the element
 * @param {"click"|"hover"} [trigger="click"] trigger event, on mobile you should stick with click
 * @param {Function} [onTooltipOpen] callback for when the tooltip is opened
 * @param {Function} [onAfterTooltipOpen] callback for after the tooltip is opened
 * @param {Object} [children] the element/s to be triggering the tooltip appearance
 *
 */
export default class Tooltip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showTooltip: false};
    }

    /**
     * This is called when a props/state is changed and allow us to do some callback calling based on rules
     * @param {Object} nextProps
     * @param {Object} nextState
     */
    componentWillUpdate(nextProps, nextState) {
        if (this.props.onTooltipOpen && !this.state.showTooltip && nextState.showTooltip) {
            this.props.onTooltipOpen();
        }
    }

    /**
     * Hook for after an update
     * @param prevProps
     * @param prevState
     */
    componentDidUpdate(prevProps, prevState) {
        if (this.props.onAfterTooltipOpen && !prevState.showTooltip && this.state.showTooltip) {
            this.props.onAfterTooltipOpen();
        }
    }

    /**
     * @returns {Object}
     */
    getEventHandlers() {
        let eventTriggerShow, eventTriggerHide;
        if (this.props.trigger === TRIGGER_EVENT_HOVER) {
            eventTriggerShow = 'onMouseOver';
            eventTriggerHide = 'onMouseLeave';
        } else {
            eventTriggerShow = 'onClick';
            eventTriggerHide = 'onBlur';
        }
        return {
            [eventTriggerShow]: e => this.setState({showTooltip: true}),
            [eventTriggerHide]: e => this.setState({showTooltip: false}),
        };
    }

    /**
     * Render
     */
    render() {
        const tooltipSide = this.props.side || SIDE_TOP;
        const tooltipAlignment = this.props.alignment || ALIGNMENT_CENTER;
        const extraClasses = this.props.className ? ` ${this.props.className}` : '';
        // tooltip must be wrapped in padded element for the hiding function (e.g onBlur) to not happen when moving the cursor
        // from outside the children to the tooltip_text
        const tooltip = this.state.showTooltip && this.props.tooltip ? (
            <div className={`tooltip_spacing_wrapper side_${tooltipSide} alignment_${tooltipAlignment}${extraClasses}`}>
                <div className='tooltip_body'>{this.props.tooltip}</div>
            </div>) : null;
        const eventHandlers = this.getEventHandlers();

        return ( // tab index is needed for the onBlur event to work
            <div className="tooltip_wrapper" {...eventHandlers} tabIndex="0">
                {tooltip}
                {this.props.children}
            </div>
        );
    }
}