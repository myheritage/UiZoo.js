import React from 'react';
import calculateType from './calculateType';
import {getBaseSynonym} from '../../../services/synonymService';

import ParamSelectorBoolean from './ParamSelectorBoolean';
import ParamSelectorVariant from './ParamSelectorVariant';
import ParamSelectorJSON from './ParamSelectorJSON';
import ParamSelectorFunction from './ParamSelectorFunction';
import ParamSelectorJSX from './ParamSelectorJSX';

const paramTypeToComponent = {
    'bool': ParamSelectorBoolean,
    'variant': ParamSelectorVariant,
    'function' : ParamSelectorFunction,
    'node': ParamSelectorJSX,
    'default': ParamSelectorJSON,
};

/**
 * @description
 * wrapper to be used to get the needed selector
 * 
 * @param {string} type Doctrine expression for the type
 * @param {string} name selector name for unique id/key
 * @param {any} selectedValue update the selector with the current selected value
 * @param {function} onChange report to parent on changes in the selector
 */
export default class ParamSelector extends React.Component {
    /**
     * get the right selector
     * @param {string} type 
     * @param {array} values 
     * @return {object}
     */
    getSelector(type, values) {
        let Selector = paramTypeToComponent[getBaseSynonym(type.toLowerCase())];
        if (type === 'variant' && (!values || !values.length)) {
            Selector = paramTypeToComponent['default'];
        }
        return Selector || paramTypeToComponent['default'];
    }

    /**
     * Render the right selector for the job
     */
    render() {
        const {type, values} = calculateType(this.props.type);
        const Selector = this.getSelector(type, values);
        return (<Selector {...this.props} values={values}/>);
    }
}