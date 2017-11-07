// only prop-types
import React from 'react';
import PropTypes from 'prop-types';

export default class Comp3 extends Component {
    render () {
        return <div>Hi Cowboy</div>;
    }
}

Comp3.defaultProps = {
    children: 'yo',
};
Comp3.propTypes = {
    children: PropTypes.node.isRequired,
    someProp1: PropTypes.oneOf(['option1', 'option2']),
    someProp2: PropTypes.shape({
        val: PropTypes.object,
        fn: PropTypes.func,
    }),
    someFn: PropTypes.func,
    someObject: PropTypes.object.isRequired,
};