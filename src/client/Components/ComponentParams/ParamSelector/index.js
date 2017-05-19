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

export default class ParamSelector extends React.Component {
    getSelector() {
        let Selector = paramTypeToComponent[this.props.type] || paramTypeToComponent['default'];
        if (this.props.type === 'variant' && (!this.props.values || !this.props.values.length)) {
            Selector = paramTypeToComponent['default'];
        }
        return Selector;
    }

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