import React from 'react';
import './index.scss';

/**
 * @name 
 * RaisedButton
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