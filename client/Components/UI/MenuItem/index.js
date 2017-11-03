import React from 'react';
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
 * <Menu value="pink">
 *    <MenuItem value="pink"
 *          style={{backgroundColor:"#ecabab"}}>
 *          Color pink
 *    </MenuItem>
 *    <MenuItem value="cyan"
 *          style={{backgroundColor:"#66cfdc"}}>
 *          Color cyan
 *    </MenuItem>
 * </Menu>
 * 
 * @example
 *  <MenuItem value="pink"
 *      style={{backgroundColor:"#ecabab"}}>
 *      Color pink
 *  </MenuItem>
 *
 * @param {string|number} value this item value in the menu
 * @param {node} children
 */
export default class MenuItem extends React.Component {
    render() {
        return (
            <div className="library-_-menu-item" style={this.props.style}>
                {this.props.children}
            </div>
        );
    }
}