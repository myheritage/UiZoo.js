import {Component} from 'react';
import './index.scss';

/**
 * @name 
 * MenuItem
 * 
 * @module
 * Menus
 * 
 * @description
 * Menu Item to be used in Menu component
 * as a child. fill props.value with this item value.
 * 
 * @example 
 * <MenuItem>
 *   Menu Item
 * </MenuItem>
 *
 * @param {string|number} value this item value in the menu
 * @param {node} children
 */
export default class MenuItem extends Component {
    render() {
        return (
            <div className="library-_-menu-item" style={this.props.style}>
                {this.props.children}
            </div>
        );
    }
}