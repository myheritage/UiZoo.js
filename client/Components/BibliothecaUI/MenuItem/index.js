import React from 'react';
import './index.scss';

/**
 * @name 
 * MenuItem
 * 
 * @description
 * Menu Item
 *
 *
 */
export default class MenuItem extends React.Component {
    render() {
        return (
            <div className="menu-item" style={this.props.style}>
                {this.props.children}
            </div>
        );
    }
}