// mix of JSDoc and prop types
import React from 'react';
import PropTypes from 'prop-types';

/**
 * @example <Content/>
 * @param {string} someProp1
 */
export default function Comp1 () {
    return (
        <div>Hi</div>
    );
}

Comp1.propTypes = {
    children: PropTypes.node,
};