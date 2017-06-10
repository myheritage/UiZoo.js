import './index.scss';

/**
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
    const additionalClassName = className
        ? ` ${className}`
        : '';

    return (
        <div className={`bibliotheca-code-card-wrapper${additionalClassName}`}>
            <pre>{children}</pre>
        </div>
    );
}