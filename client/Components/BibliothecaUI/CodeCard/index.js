import './index.scss';

/**
 * @name
 * CodeCard
 * 
 * @module
 * Cards
 * 
 * @description
 * CodeCard with border and inset box-shadow
 * to show code examples with "pre" tag
 *
 * @example
 * <CodeCard>
 *      console.log('You are awesome!');
 * </CodeCard>
 *
 * @param {string} [className]
 * @param {node} children
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