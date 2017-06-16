import './index.scss';

/**
 * @name 
 * Card
 * 
 * @module
 * Cards
 * 
 * @description
 * Card container with border and box-shadow
 * Wrap children for showing them in a nice frame
 *
 * @example
 * // card with children
 * <Card>
 *  <div>Card content</div>
 *  <br/>
 *  <img src="https://i.imgur.com/8CoNRCD.gif"></img>
 * </Card>
 *
 * @param {String} [className] Append class name to container
 * @param {node} [children] Children elements
 */
export default function Card({children, className}) {
    const additionalClassName = className ? ` ${className}` : '';
    return <div className={`bibliotheca-card-wrapper${additionalClassName}`}>{children}</div>;
}