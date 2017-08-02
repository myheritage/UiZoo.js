import {Component} from 'react';
import './index.scss';

/**
 * @name
 * Menu 
 * 
 * @module
 * Menus
 * 
 * @description
 * Menu to select items
 * Wrap MenuItem components with the prop "value"
 * and control the chosen value by the Menu prop "value"
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
 * @param {string|number} [value] current selected value of MenuItem inside the menu
 * @param {function} [onChange] callback for changes in selected value
 * @param {node} children MenuItems to be selected
 */
export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {selectedValue: props.value};
    }

    /**
     * Check if the props.value has changed, and if so update the state
     * @param {Object} nextProps 
     */
    componentWillReceiveProps(nextProps) {
        const {value} = nextProps;
        if (value !== this.props.value && value !== this.state.selectedValue) {
            this.setState({selectedValue: value});
        }
    }
    
    /**
     * Update props.onChange if the value has changed
     * @param {event} e 
     * @param {string|number} val 
     */
    onChange(e, val) {
        if (val !== this.state.selectedValue) {
            this.setState({selectedValue: val});
            this.props.onChange && this.props.onChange(e, val);
        }
    }

    /**
     * Calculate this item class name
     * @param {string|number} val 
     * @returns {string}
     */
    getItemClassName(val) {
        return `library-_-menu-item-wrapped${val === this.state.selectedValue ? ' selected' : ''}`;
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
            <div className="library-_-menu-wrapper">
                {items}
            </div>
        );
    }
}