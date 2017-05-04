/**
 * @description
 * Card with border and box-shadow
 *
 * @example
 * 1) variant: default
 *  <Card>
 *      <CardHeader>
 *          Header
 *      </CardHeader>
 *      <CardRow>
 *          Row 1
 *      </CardRow>
 *      <CardRow>
 *          Row 2
 *      </CardRow>
 *  </Card>
 *
 * 2) variant: expanded - no side-borders on mobile for full width card
 *  <Card variant="expanded">
 *      <CardRow>
 *          Row 1
 *      </CardRow>
 *      <CardRow>
 *          Row 2
 *      </CardRow>
 *  </Card>
 *
 * @param {"expanded"} [variant]
 * @param {String} [className]
 * @param {React.Children} [children]
 *
 */
export default function Card({variant, children, className}) {
    const variantClass = variant ? ` ${variant}` : '';
    const additionalClassName = className ? ` ${className}` : '';
    return <div className={`card_wrapper${variantClass}${additionalClassName}`}>{children}</div>;
}

Card.propTypes = {
    variant: PropTypes.oneOf(VARIANTS),
    className: PropTypes.string,
};