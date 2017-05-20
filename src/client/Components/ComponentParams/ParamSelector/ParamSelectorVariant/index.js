import React from 'react';
import PropTypes from 'prop-types';
import {Menu} from 'material-ui';
import {MenuItem} from 'material-ui';
import {Paper} from 'material-ui';
import {menuStyle} from '../menuStyle';

export default class ParamSelectorVariant extends React.Component {
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

    renderValueItem(val) {
        return <MenuItem key={`values-item-${val}`} primaryText={val} value={val}/>;
    }

    render() {
        const valueItems = (this.props.values || []).map(val => this.renderValueItem(val));
        return (
            <Menu
                {...menuStyle}
                key={`variant-field-for-${this.props.name}`}
                onChange={(e, newValue) => this.onChange(e, newValue)}
                value={this.state.value}>
                <MenuItem primaryText="default" value={undefined}/>
                {valueItems}
            </Menu>
        );
    }
}

ParamSelectorVariant.PropTypes = {
    selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    values: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    onChange: PropTypes.func
};