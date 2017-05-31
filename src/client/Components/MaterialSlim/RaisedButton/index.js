import React from 'react';
import './index.scss';

/**
 * @param {any} children
 * @param {function} [onClick]
 */
export default class RaisedButton extends React.Component {
  render() {
    const {children, onClick} = this.props;
    return (
      <div className="raised-button">
        <button onClick={e => onClick && onClick(e)}>
          <span>{children}</span>
        </button>
      </div>
    );
  }
}