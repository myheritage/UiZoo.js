import React from 'react';
import MenuItem from '../../../UI/MenuItem';
import Menu from '../../../UI/Menu';

/**
 * @description
 * selector for array of variants, like string or number
 * 
 * @param {number|string} [selectedValue]
 * @param {array} values
 * @param {function} onChange
 */
export default class ParamSelectorVariant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.selectedValue
        };
    }

    /**
     * Update state.value if props.selectedValue has changed
     * @param {object} nextProps 
     */
    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedValue !== this.props.selectedValue) {
            this.setState({value: nextProps.selectedValue});
        }
    }

    /**
     * @param {event} e 
     * @param {string|number} newValue 
     */
    onChange(e, newValue) {
        this.setState({value: newValue});
        this.props.onChange && this.props.onChange(e, newValue);
    }

    /**
     * render an item in the menu, each item for a value in values
     * @param {string|number} val 
     */
    renderValueItem(val) {
        return <MenuItem key={`values-item-${val}`} value={val}>{val}</MenuItem>;
    }

    /**
     * render menu with the values
     * Adding an undefined value for "default""
     */
    render() {
        const valueItems = (this.props.values || []).map(val => this.renderValueItem(val));
        return (
            <Menu
                onChange={(e, newValue) => this.onChange(e, newValue)}
                value={this.state.value}>
                <MenuItem value={undefined}>default</MenuItem>
                {valueItems}
            </Menu>
        );
    }
}