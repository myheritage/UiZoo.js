import React from 'react';

import MenuItem from '../../../MaterialSlim/MenuItem';
import Menu from '../../../MaterialSlim/Menu';

/**
 * @description
 * selector for boolean values
 * 
 * @param {boolean} [selectedValue]
 * @param {function} onChange
 */
export default class ParamSelectorBoolean extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.selectedValue
        };
    }

    /**
     * Updated state.value if props.selectedValue has changed
     * @param {object} nextProps 
     */
    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedValue !== this.props.selectedValue) {
            this.setState({value: nextProps.selectedValue});
        }
    }

    /**
     * Update state and report to parent onChange
     * @param {event} e 
     * @param {boolean|undefined} newValue 
     */
    onChange(e, newValue) {
        this.setState({value: newValue});
        this.props.onChange && this.props.onChange(e, newValue);
    }

    /**
     * render the selector
     */
    render() {
        return (
            <Menu 
                onChange={(e, newValue) => this.onChange(e, newValue)}
                value={this.state.value}>
                <MenuItem>default</MenuItem>
                <MenuItem value={true}>true</MenuItem>
                <MenuItem value={false}>false</MenuItem>
            </Menu>
        );
    }
}