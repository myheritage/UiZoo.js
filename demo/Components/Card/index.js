import './index.scss';

import PropTypes from 'prop-types';

/**
 * @description
 * Card with border and box-shadow
 *
 * @example
 * card with children
 * <Card>
 *  1123
 * </Card>
 *
 * @param {String} [className] Append class name to container
 * @param {React.Children} [children] Children elements
 *
 */
export default function Card({children, className}) {
    const additionalClassName = className ? ` ${className}` : '';
    return <div className={`card-wrapper${additionalClassName}`}>{children}</div>;
}

Card.propTypes = {
    className: PropTypes.string,
};