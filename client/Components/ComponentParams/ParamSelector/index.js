import React from 'react';
import calculateType from './calculateType';

import ParamSelectorBoolean from './ParamSelectorBoolean';
import ParamSelectorVariant from './ParamSelectorVariant';
import ParamSelectorJSON from './ParamSelectorJSON';
import ParamSelectorFunction from './ParamSelectorFunction';

const paramTypeToComponent = {
    'boolean': ParamSelectorBoolean,
    'variant': ParamSelectorVariant,
    'function' : ParamSelectorFunction,
    'default': ParamSelectorJSON
};

/**
 * @description
 * wrapper to be used to get the needed selector
 * 
 * @param {string} typeExpression Doctrine expression for the type
 * @param {string} name selector name for unique id/key
 * @param {any} selectedValue update the selector with the current selected value
 * @param {function} onChange report to parent on changes in the selector
 */
export default class ParamSelector extends React.Component {
    /**
     * get the right selector
     * @return {object}
     */
    getSelectorAndValues() {
        const {type, values} = (calculateType(this.props.typeExpression));
        let Selector = paramTypeToComponent[type] || paramTypeToComponent['default'];
        if (type === 'variant' && (!values || !values.length)) {
            Selector = paramTypeToComponent['default'];
        }
        return {Selector, values};
    }

    /**
     * Render the right selector for the job
     */
    render() {
        const {Selector, values} = this.getSelectorAndValues();
        return (<Selector {...this.props} values={values}/>);
    }
}