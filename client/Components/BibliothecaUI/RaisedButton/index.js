import React from 'react';
import './index.scss';

/**
 * @name 
 * RaisedButton
 * 
 * @description
 * A styled button for clicking
 * 
 * @example
 * <RaisedButton onClick={(e) => console.log('RaisedButton was clicked, event: ', e)}>
 *    Raised Button
 * </RaisedButton>
 * 
 * @param {any} children
 * @param {function} [onClick]
 */
export default class RaisedButton extends React.Component {
  render() {
    const {children, onClick} = this.props;
    return (
      <div className="bibliotheca-raised-button">
        <button 
          tabIndex="1"
          onClick={e => onClick && onClick(e)}>
          <span>{children}</span>
        </button>
      </div>
    );
  }
}