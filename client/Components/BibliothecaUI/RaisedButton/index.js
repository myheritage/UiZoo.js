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
 *    Raised Button Text, test
 * </RaisedButton>
 * 
 * @param {function} [onClick] callback for the tooltip was clicked
 * @param {node} children the clickable element that will open the tooltip
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