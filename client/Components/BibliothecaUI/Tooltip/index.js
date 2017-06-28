import {Component} from 'react';
import ReactDOM from 'react-dom';
import _ from 'underscore';

import {getLocationForElementAroundZone} from './autoLocationDetector/autoLocationDetector';
import {SIDE_TOP, ALIGNMENT_START} from './locationConstants';
import UiTooltip from './UiTooltip';

const SPACING = 5;

/**
 * @name
 * Tooltip
 * 
 * @module
 * Content
 * 
 * @description
 * Tooltip to be shown on hover or click events.
 * Wrap children to give them the tooltip upon them.
 * This is an auto-location Tooltip. Responsive solution to the tooltip.
 *
 * @example
 * // Default props
 * <Tooltip tooltip={'tooltip inner text!'}>
 *     Click me to open the tooltip!
 * </Tooltip>
 * 
 * @example 
 * // center bottom directions
 * <Tooltip tooltip={'tooltip inner text on the bottom!'} side="bottom" alignment="center" trigger="hover">
 *     Text to open the tooltip upon on the bottom
 * </Tooltip>
 *
 * @param {node} [tooltip] tooltip inner content, can be text or elements
 * @param {"top"|"bottom"} [side=top] preferred placement of the tooltip relative to the element
 * @param {"center"|"start"|"end"} [alignment=center] preferred alignment of the tooltip relative to the element
 * @param {"click"|"hover"} [trigger=click] trigger event, on mobile you should stick with click
 * @param {function} [onTooltipOpen] callback for when the tooltip is opened
 * @param {function} [onAfterTooltipOpen] callback for after the tooltip is opened
 * @param {node} [children] the element/s to be triggering the tooltip appearance
 */
export default class Tooltip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            side: props.side || SIDE_TOP,
            alignment: props.alignment || ALIGNMENT_START,
        };
    }

    /**
     * Save dom element for calculating its location on tooltip body opening
     */
    componentDidMount() {
        this.tooltipElement = ReactDOM.findDOMNode(this.tooltipRef);
    }

    /**
     * Fix the location (side & alignment) of the tooltip body around the tooltip element
     * Based on possible sides & alignments. Provided props is considered the preferred outcome, if possible they will be returned
     */
    updateTooltipLocation() {
        // tooltip body exist in the DOM only after the tooltip is being opened
        let tooltipBody = this.tooltipElement ? this.tooltipElement.querySelector('.bibliotheca-tooltip-body') : null;
        if (tooltipBody) {
            const preferredSide = this.props.side || SIDE_TOP;
            const preferredAlignment = this.props.alignment || ALIGNMENT_START;
            const newState = getLocationForElementAroundZone(tooltipBody, this.tooltipElement, preferredSide, preferredAlignment, SPACING);

            // setState only if there is a change from the current state
            if (newState && (this.state.side !== newState.side || this.state.alignment !== newState.alignment)) {
                this.setState(newState);
            }
        }
    }

    /**
     * Render
     */
    render() {
        // extend the onAfterTooltipOpen hook with the autoLocation actions
        const currentOnAfterTooltipOpen = this.props.onAfterTooltipOpen;
        const onAfterTooltipOpen = () => {
            this.updateTooltipLocation();
            currentOnAfterTooltipOpen && currentOnAfterTooltipOpen();
        }

        // Set the new side & alignment from the state
        const tooltipProps = _.extend({}, this.props, {
            onAfterTooltipOpen,
            side: this.state.side,
            alignment: this.state.alignment,
            initiallyOpen: this.props.initiallyOpen
        });

        return (
            <UiTooltip {...tooltipProps} ref={ref => this.tooltipRef = ref}/>
        );
    }
}