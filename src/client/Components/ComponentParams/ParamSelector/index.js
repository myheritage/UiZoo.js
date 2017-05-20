import React from 'react';
import PropTypes from 'prop-types';

import ParamSelectorBoolean from './ParamSelectorBoolean';
import ParamSelectorVariant from './ParamSelectorVariant';
import ParamSelectorJSON from './ParamSelectorJSON';

import './index.scss';

const paramTypeToComponent = {
    'boolean': ParamSelectorBoolean,
    'variant': ParamSelectorVariant,
    'default': ParamSelectorJSON
};

/**
 * @description
 * wrapper to be used to get the needed selector
 * 
 * @param {string} type e.g boolean, variant, string..
 * @param {string} name selector name for unique id/key
 * @param {array} values list of possible values to show, optional in some of the selectors
 * @param {any} selectedValue update the selector with the current selected value
 * @param {function} onChange report to parent on changes in the selector
 */
export default class ParamSelector extends React.Component {
    /**
     * get the right selector
     * @return {object}
     */
    getSelector() {
        let Selector = paramTypeToComponent[this.props.type] || paramTypeToComponent['default'];
        if (this.props.type === 'variant' && (!this.props.values || !this.props.values.length)) {
            Selector = paramTypeToComponent['default'];
        }
        return Selector;
    }

    /**
     * Render the right selector for the job
     */
    render() {
        const Selector = this.getSelector();
        return (<Selector {...this.props}/>);
    }
}

ParamSelector.PropTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    values: PropTypes.array,
    selectedValue: PropTypes.any,
    onChange: PropTypes.func
};