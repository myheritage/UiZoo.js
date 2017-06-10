import React from 'react';
import './index.scss';

/**
 * @name
 * Menu 
 * @description
 * Menu to select items
 * 
 * @example
 * <Menu value="red" onChange={(e, val) => console.log(val)}>
 *    <MenuItem value="red"
 *          style={{backgroundColor:"#f59a9a"}}>
 *          Color red
 *    </MenuItem>
 *    <MenuItem value="blue"
 *          style={{backgroundColor:"#2196f3"}}>
 *          Color blue
 *    </MenuItem>
 *    <MenuItem value="yellow"
 *          style={{backgroundColor:"#ffeb3b"}}>
 *          Color yellow
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