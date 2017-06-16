import {Component} from 'react';
import './index.scss';

/**
 * @name 
 * RaisedButton
 * 
 * @module
 * Buttons
 * 
 * @description
 * A styled button for clicking and hovering
 * 
 * @example
 * <RaisedButton onClick={(e) => console.log('RaisedButton was clicked, event: ', e)}>
 *    Raised Button Text, check out the browser's console after a click
 * </RaisedButton>
 * 
 * @param {function} [onClick]
 * @param {node} children
 */
export default class RaisedButton extends Component {
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