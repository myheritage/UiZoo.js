import './index.scss';

import PropTypes from 'prop-types';

/**
 * @name Card
 * @description
 * Card with border and box-shadow
 *
 * @example
 * <Card></Card>
 *
 * @param {String} [className]
 * @param {React.Children} [children]
 *
 */
export default function Card({children, className}) {
    const additionalClassName = className ? ` ${className}` : '';
    return <div className={`card-wrapper${additionalClassName}`}>{children}</div>;
}

Card.propTypes = {
    className: PropTypes.string,
};