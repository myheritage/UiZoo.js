// Edge case of JSDoc not directly next to the component

/**
 * @name Comp4
 * @example <Comp4 />
 * @param {string} someProp1
 */
import React from 'react';
import PropTypes from 'prop-types';

export default class Comp4 extends Component {
    render () {
        return <div>Hiyo</div>;
    }
}
/**
 * other comment 
 * @param {string} yo
 */