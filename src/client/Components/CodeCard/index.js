import './index.scss';

import PropTypes from 'prop-types';

/**
 * @name CodeCard
 * @description
 * CodeCard with border and inset box-shadow
 *
 * @example
 * <CodeCard></CodeCard>
 *
 * @param {String} [className]
 * @param {React.Children} [children]
 *
 */
export default function CodeCard({children, className}) {
    const additionalClassName = className ? ` ${className}` : '';
    return (
        <div className={`code-card-wrapper${additionalClassName}`}>
            <pre>
                {children}
            </pre>
        </div>
    );
}

CodeCard.propTypes = {
    className: PropTypes.string,
};