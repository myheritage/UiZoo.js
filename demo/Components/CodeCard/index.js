import './index.scss';

import PropTypes from 'prop-types';

/**
 * @description
 * CodeCard with border and inset box-shadow
 *
 * @example
 * <CodeCard></CodeCard>
 *
 * @param {"other-class"|"more-class"} [className]
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