import _ from 'underscore';
import {
    SIDE_TOP,
    SIDE_BOTTOM,
    ALIGNMENT_CENTER,
    ALIGNMENT_START,
    ALIGNMENT_END
} from '../locationConstants';

/**
 * Calculate location object for an element around a certain "zone" (represented by another element)
 * The returned location object includes side & alignment from possible constants in "locationConstants"
 *
 * @param {HTMLElement} element
 * @param {HTMLElement} zoneElement
 * @param {String} [preferredSide]
 * @param {String} [preferredAlignment]
 * @param {Number} [spacing]
 * @param {Object} [_window]
 * @returns {{side: String, alignment: String}}
 */
export function getLocationForElementAroundZone(element, zoneElement, preferredSide = SIDE_TOP, preferredAlignment = ALIGNMENT_CENTER, spacing = 0, _window = window) {
    let newLocation = {
        side: preferredSide,
        alignment: preferredAlignment
    };

    if (element && zoneElement) {
        const rectProperties = getRectProperties(element);
        const zoneRectProperties = getRectProperties(zoneElement);
        const isRtl = _window.languageDirection === 'RTL';

        newLocation.side = getBestSide(rectProperties, zoneRectProperties, _window.innerHeight, spacing, preferredSide);
        newLocation.alignment = getBestAlignment(rectProperties, zoneRectProperties, _window.innerWidth, isRtl, spacing, preferredAlignment);
    }

    return newLocation;
}

/**
 * Check for the best side possible, regarding the preferred side and the available sides
 * @param {Object} rectProperties
 * @param {Object} zoneRectProperties
 * @param {Number} screenHeight
 * @param {Number} spacing
 * @param {String} preferredSide
 * @returns {String}
 */
function getBestSide(rectProperties, zoneRectProperties, screenHeight, spacing, preferredSide) {
    const canGoTop = zoneRectProperties.y - rectProperties.height - spacing > 0;
    const canGoBottom = zoneRectProperties.y2 + rectProperties.height + spacing < screenHeight;

    let side = preferredSide;
    // when both sides are available - use the preferred side
    if (canGoTop && !canGoBottom) {
        side = SIDE_TOP;
    }
    if (!canGoTop && canGoBottom) {
        side = SIDE_BOTTOM;
    }

    return side;
}

/**
 * Check for the best alignment possible, takes preferred alignment if possible
 * @param {Object} rectProperties
 * @param {Object} zoneRectProperties
 * @param {Number} screenWidth
 * @param {boolean} isRtl
 * @param {Number} spacing
 * @param {String} preferredAlignment
 * @returns {String}
 */
function getBestAlignment(rectProperties, zoneRectProperties, screenWidth, isRtl, spacing, preferredAlignment) {
    let alignment = preferredAlignment;
    let zoneCenter = (zoneRectProperties.x + zoneRectProperties.x2) / 2;
    let canGoCenter = (zoneCenter - rectProperties.width / 2 - spacing) > 0 && (zoneCenter + rectProperties.width / 2 - spacing) < screenWidth;
    let canGoStart = zoneRectProperties.x + rectProperties.width + spacing < screenWidth;
    let canGoEnd = zoneRectProperties.x2 - rectProperties.width - spacing > 0;

    // Switch start & end for RTL
    if (isRtl) {
        [canGoStart, canGoEnd] = [canGoEnd, canGoStart];
    }

    // collect all alignments possibilities
    let possibleAlignments = [];
    if (canGoCenter) {
        possibleAlignments.push(ALIGNMENT_CENTER);
    }
    if (canGoStart) {
        possibleAlignments.push(ALIGNMENT_START);
    }
    if (canGoEnd) {
        possibleAlignments.push(ALIGNMENT_END);
    }

    // take preferred alignment (which is the default), if not possible - take the first one possible
    if (!_.contains(possibleAlignments, preferredAlignment) && possibleAlignments.length > 0) {
        alignment = possibleAlignments[0];
    }

    return alignment;
}

/**
 * Returns BoundingClientRect with width/height values
 * @param {HTMLElement} el
 * @returns {Object}
 */
function getRectProperties(el = {}) {
    let props = {};
    if (el.getBoundingClientRect) {
        const rect = el.getBoundingClientRect();
        props = {
            x: rect.left,
            y: rect.top,
            x2: rect.right,
            y2: rect.bottom,
            width: rect.right - rect.left,
            height: rect.bottom - rect.top,
        };
    }

    return props;
}