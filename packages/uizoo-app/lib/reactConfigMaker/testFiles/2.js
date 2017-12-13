// only JSDoc
import React from 'react';
import PropTypes from 'prop-types';

/**
 * @name Comp2Name
 * @module Comp2Module
 * @example <Comp2 />
 * @example <Comp2 someProp1="val1" someProp2="val2">child</Comp2>
 * @param {string} someProp1
 * @param {"val2"|"val3"} [someProp2]
 */
export default class Comp2 extends Component {
    render () {
        return <div>Hiyo</div>;
    }
}