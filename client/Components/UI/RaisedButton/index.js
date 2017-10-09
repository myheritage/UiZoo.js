import React from 'react';
import './index.scss';

/**
 * @name 
 * RaisedButton
 * 
 * @module
 * Inputs
 * 
 * @description
 * A styled button for clicking and hovering
 * 
 * @example
 * <RaisedButton onClick={(e) => console.log('RaisedButton was clicked, event: ', e)}>
 *    Raised Button Text
 * </RaisedButton>
 * 
 * @param {function} [onClick] callback for the tooltip was clicked
 * @param {*} children the clickable element that will open the tooltip
 */
export default class RaisedButton extends React.Component {
  render() {
    const {children, onClick} = this.props;
    return (
      <div className="library-_-raised-button">
        <button 
          tabIndex="1"
          onClick={e => onClick && onClick(e)}>
          <span>{children}</span>
        </button>
      </div>
    );
  }
}