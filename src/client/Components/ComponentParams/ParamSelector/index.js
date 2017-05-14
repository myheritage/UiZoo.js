import React from 'react';

import ParamSelectorBoolean from './ParamSelectorBoolean';
import ParamSelectorString from './ParamSelectorString';

import './index.scss';

const paramTypeToComponent = {
    'boolean': ParamSelectorBoolean,  
    'string': ParamSelectorString,
    // 'default': ParamSelectorJSON,?
};

export default class ParamSelector extends React.Component {
    render() {
        const ChosenSelector = paramTypeToComponent[this.props.type];
        return (
            <ChosenSelector {...this.props} />
        );
    }
}