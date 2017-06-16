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
 * Menu Item
 * 
 * @example 
 * <MenuItem>
 *   Menu Item
 * </MenuItem>
 *
 * @param {node} children
 */
export default class MenuItem extends React.Component {
    render() {
        return (
            <div className="bibliotheca-menu-item" style={this.props.style}>
                {this.props.children}
            </div>
        );
    }
}