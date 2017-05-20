import React from 'react';
import PropTypes from 'prop-types';
import {Menu} from 'material-ui';
import {MenuItem} from 'material-ui';
import {Paper} from 'material-ui';
import {menuStyle} from '../menuStyle';

export default class ParamSelectorBoolean extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.selectedValue
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedValue !== this.props.selectedValue) {
            this.setState({value: nextProps.selectedValue});
        }
    }

    onChange(e, newValue) {
        this.setState({value: newValue});
        this.props.onChange && this.props.onChange(e, newValue);
    }

    render() {
        return (
            <Menu
                {...menuStyle}
                key={`boolean-field-for-${this.props.name}`}
                onChange={(e, newValue) => this.onChange(e, newValue)}
                value={this.state.value}>
                <MenuItem primaryText="default" value={undefined}/>
                <MenuItem primaryText="true" value={true}/>
                <MenuItem primaryText="false" value={false}/>
            </Menu>
        );
    }
}

ParamSelectorBoolean.PropTypes = {
    selectedValue: PropTypes.oneOf([true, false]),
    onChange: PropTypes.func,
};