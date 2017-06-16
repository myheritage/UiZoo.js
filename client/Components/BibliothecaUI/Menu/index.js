import React from 'react';
import './index.scss';

/**
 * @name
 * Menu 
 * @description
 * Menu to select items
 * 
 * @example
 * // Choose a color
 * <Menu value="pink" onChange={(e, val) => console.log(val)}>
 *    <MenuItem value="pink"
 *          style={{backgroundColor:"#ecabab"}}>
 *          Color pink
 *    </MenuItem>
 *    <MenuItem value="cyan"
 *          style={{backgroundColor:"#66cfdc"}}>
 *          Color cyan
 *    </MenuItem>
 *    <MenuItem value="green"
 *          style={{backgroundColor:"#abca87"}}>
 *          Color green
 *    </MenuItem>
 * </Menu>
 * 
 * @param {any} value
 * @param {function} [onChange]
 * @param {node} children
 */
export default class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selectedValue: props.value};
    }

    componentWillReceiveProps(nextProps) {
        const {value} = nextProps;
        if (value !== this.props.value && value !== this.state.selectedValue) {
            this.setState({selectedValue: value});
        }
    }
    
    onChange(e, val) {
        if (val !== this.state.selectedValue) {
            this.setState({selectedValue: val});
            this.props.onChange && this.props.onChange(e, val);
        }
    }

    getItemClassName(val) {
        return `bibliotheca-menu-item-wrapped${val === this.state.selectedValue ? ' selected' : ''}`;
    }

    render () {
        const items = React.Children.map(this.props.children, child => (
            <button
                tabIndex="1"
                onClick={e => this.onChange(e, child.props.value)}
                className={this.getItemClassName(child.props.value)}>
                {child}
            </button>
        ));

        return (
            <div className="bibliotheca-menu-wrapper">
                {items}
            </div>
        );
    }
}