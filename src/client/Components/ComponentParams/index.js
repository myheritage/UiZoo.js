import React from 'react';
import PropTypes from 'prop-types';
import equal from 'deep-equal';

import Tooltip from '../AutoLocationTooltip';
import ParamSelector from './ParamSelector';

import './index.scss';

/**
 * @description
 * a list of selectors to choose params
 * 
 * @param {array} params list of param objects to show a selector
 */
export default class ComponentParams extends React.Component {
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
                <Tooltip tooltip={paramObj.description}>
                    <p className="param-name">
                        {paramObj.name}
                        {!!paramObj.isOptional && <span>*</span>}
                    </p>
                </Tooltip>
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
            </div>
        );
    }
}

ComponentParams.propTypes = {
    params: PropTypes.arrayOf(PropTypes.shape({name: PropTypes.string, description: PropTypes.string, isOptional: PropTypes.bool, values: PropTypes.array}))
};