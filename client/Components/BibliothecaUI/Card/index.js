import './index.scss';


/**
 * @name 
 * Card
 * 
 * @description
 * Card with border and box-shadow
 *
 * @example
 * // card with children
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
    return <div className={`bibliotheca-card-wrapper${additionalClassName}`}>{children}</div>;
}