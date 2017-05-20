import React from 'react';
import PropTypes from 'prop-types';
import equal from 'deep-equal';

import {Popover} from 'material-ui';
import ParamSelector from './ParamSelector';

import './index.scss';

const anchorOrigin = {
    horizontal: 'left',
    vertical: 'top'
};
const targetOrigin = {
    horizontal: 'left',
    vertical: 'bottom'
};

/**
 * @description
 * a list of selectors to choose params
 * 
 * @param {array} params list of param objects to show a selector
 */
export default class ComponentParams extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            popoverOpen: false
        };
    }

    /**
     * Checks if the params has changed or the state has changed for rendering
     * @param {object} nextProps 
     * @param {object} nextState 
     * @return {boolean}
     */
    shouldComponentUpdate(nextProps, nextState) {
        const paramsAreEquals = equal(this.props.params, nextProps.params, {strict:true});
        const stateAreEquals = equal(this.state, nextState, {strict:true});
        return !paramsAreEquals || !stateAreEquals;
    }

    /**
     * Update the state for opening a popover with the param description
     * @param {element} popoverAnchorEl 
     * @param {string} popoverContent will not open the popover if content is empty
     */
    openParamDescription(popoverAnchorEl, popoverContent) {
        if (popoverContent) {
            this.setState({popoverOpen: true, popoverAnchorEl, popoverContent});
        }
    }

    /**
     * close the popover
     */
    closeParamDescription() {
        this.setState({popoverOpen: false});
    }

    /**
     * report change to parent with the name of the param
     * @param {event|null} e not all selectors can provide the event of the tap
     * @param {string} paramName 
     * @param {any} newValue 
     */
    onChange(e, paramName, newValue) {
        this.props.onChange && this.props.onChange(e, paramName, newValue);
    }

    /**
     * Render a single selector from the list
     * @param {object} paramObj 
     */
    renderSelector(paramObj) {
        return (
            <div className="component-params-selector" key={`param-name-${paramObj.name}`}>
                <p
                    className="param-name"
                    onTouchTap={e => this.openParamDescription(e.currentTarget, paramObj.description)}>
                    {paramObj.name}
                    {!!paramObj.isOptional && <span>*</span>}
                </p>
                <ParamSelector
                    key={`selector-for-${paramObj.name}`}
                    name={paramObj.name}
                    type={paramObj.type}
                    values={paramObj.values}
                    selectedValue={undefined}
                    onChange={(e, newValue) => this.onChange(e, paramObj.name, newValue)}/>
            </div>
        );
    }

    /**
     * render the list of params as selectors
     */
    render() {
        const selectors = (this.props.params || []).map(paramObj => this.renderSelector(paramObj));
        return (
            <div className="component-params">
                {selectors}
                {selectors.length === 0 && 'None'}
                <Popover
                    open={this.state.popoverOpen}
                    anchorEl={this.state.popoverAnchorEl}
                    anchorOrigin={anchorOrigin}
                    targetOrigin={targetOrigin}
                    onRequestClose={() => this.closeParamDescription()}>
                    <div className="component-params-popover-content">
                        <p>{this.state.popoverContent}</p>
                    </div>
                </Popover>
            </div>
        );
    }
}

ComponentParams.propTypes = {
    params: PropTypes.arrayOf(PropTypes.shape({name: PropTypes.string, description: PropTypes.string, isOptional: PropTypes.bool, values: PropTypes.array}))
};