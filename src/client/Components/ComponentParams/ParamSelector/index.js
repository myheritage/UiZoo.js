import React from 'react';

import ParamSelectorBoolean from './ParamSelectorBoolean';
import ParamSelectorString from './ParamSelectorString';
import ParamSelectorJSON from './ParamSelectorJSON';

import './index.scss';

const paramTypeToComponent = {
    'boolean': ParamSelectorBoolean,  
    'string': ParamSelectorString,
    'default': ParamSelectorJSON,
};

export default class ParamSelector extends React.Component {
    render() {
        const Selector = paramTypeToComponent[this.props.type] || paramTypeToComponent['default'];
        return (
            <Selector {...this.props} />
        );
    }
}