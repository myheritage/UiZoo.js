import {getLocationForElementAroundZone} from './autoLocationDetector';
import {
    SIDE_TOP,
    ALIGNMENT_CENTER,
    SIDE_BOTTOM,
    ALIGNMENT_START
} from './locationConstants';

let windowMock,
    element,
    elementRect,
    zoneElement,
    zoneElementRect;

describe('autoLocationDetector', () => {
    beforeEach(() => {
        windowMock = {
            innerHeight: 100,
            innerWidth: 100,
            languageDirection: 'LTR',
        };
        element = jasmine.createSpyObj('elementMock', ['getBoundingClientRect']);
        zoneElement = jasmine.createSpyObj('zoneElementMock', ['getBoundingClientRect']);
        elementRect = {left: 0, top: 0, right: 10, bottom: 10};
        zoneElementRect = {left: 30, top: 30, right: 70, bottom: 70};
        element.getBoundingClientRect.and.returnValue(elementRect);
        zoneElement.getBoundingClientRect.and.returnValue(zoneElementRect);
    });

    describe('getLocationForElementAroundZone', () => {
        it('should handle bad input', () => {
            expect(getLocationForElementAroundZone()).toEqual({
                side: SIDE_TOP,
                alignment: ALIGNMENT_CENTER
            });
            expect(getLocationForElementAroundZone(null, null, SIDE_BOTTOM, ALIGNMENT_START, 0, windowMock)).toEqual({
                side: SIDE_BOTTOM,
                alignment: ALIGNMENT_START
            });
        });

        it('should use preferred side if all sides are possible', () => {
            elementRect.bottom = 10;
            zoneElementRect.top = 40;
            zoneElementRect.bottom = 50;
            expect(getLocationForElementAroundZone(element, zoneElement, SIDE_BOTTOM, ALIGNMENT_CENTER, 0, windowMock)).toEqual({
                side: SIDE_BOTTOM,
                alignment: ALIGNMENT_CENTER
            });
            expect(getLocationForElementAroundZone(element, zoneElement, SIDE_TOP, ALIGNMENT_CENTER, 0, windowMock)).toEqual({
                side: SIDE_TOP,
                alignment: ALIGNMENT_CENTER
            });
        });

        it('should use preferred side if both of the sides are not possible', () => {
            elementRect.bottom = 100;
            zoneElementRect.top = 10;
            zoneElementRect.bottom = 90;
            expect(getLocationForElementAroundZone(element, zoneElement, SIDE_BOTTOM, ALIGNMENT_CENTER, 0, windowMock)).toEqual({
                side: SIDE_BOTTOM,
                alignment: ALIGNMENT_CENTER
            });
            expect(getLocationForElementAroundZone(element, zoneElement, SIDE_TOP, ALIGNMENT_CENTER, 0, windowMock)).toEqual({
                side: SIDE_TOP,
                alignment: ALIGNMENT_CENTER
            });
        });

        it('should use bottom if top not available and bottom is available', () => {
            elementRect.bottom = 20;
            zoneElementRect.top = 10;
            zoneElementRect.bottom = 20;
            expect(getLocationForElementAroundZone(element, zoneElement, SIDE_TOP, ALIGNMENT_CENTER, 0, windowMock)).toEqual({
                side: SIDE_BOTTOM,
                alignment: ALIGNMENT_CENTER
            });
        });

        it('should use top if bottom not available and top is available', () => {
            elementRect.bottom = 20;
            zoneElementRect.top = 70;
            zoneElementRect.bottom = 80;
            expect(getLocationForElementAroundZone(element, zoneElement, SIDE_BOTTOM, ALIGNMENT_CENTER, 0, windowMock)).toEqual({
                side: SIDE_TOP,
                alignment: ALIGNMENT_CENTER
            });
        });

        it('should take spacing into account', () => {
            elementRect.bottom = 20;
            zoneElementRect.top = 70;
            zoneElementRect.bottom = 79;
            expect(getLocationForElementAroundZone(element, zoneElement, SIDE_BOTTOM, ALIGNMENT_CENTER, 1, windowMock)).toEqual({
                side: SIDE_TOP,
                alignment: ALIGNMENT_CENTER
            });
        });

        it('should use preferred alignment if all alignments are possible', () => {
            elementRect.right = 10;
            zoneElementRect.left = 40;
            zoneElementRect.right = 50;
            expect(getLocationForElementAroundZone(element, zoneElement, SIDE_TOP, ALIGNMENT_CENTER, 0, windowMock)).toEqual({
                side: SIDE_TOP,
                alignment: ALIGNMENT_CENTER
            });
            expect(getLocationForElementAroundZone(element, zoneElement, SIDE_TOP, ALIGNMENT_START, 0, windowMock)).toEqual({
                side: SIDE_TOP,
                alignment: ALIGNMENT_START
            });
        });

        it('should use preferred alignment if all of the alignments are not possible', () => {
            elementRect.right = 100;
            expect(getLocationForElementAroundZone(element, zoneElement, SIDE_TOP, ALIGNMENT_CENTER, 0, windowMock)).toEqual({
                side: SIDE_TOP,
                alignment: ALIGNMENT_CENTER
            });
            expect(getLocationForElementAroundZone(element, zoneElement, SIDE_TOP, ALIGNMENT_START, 0, windowMock)).toEqual({
                side: SIDE_TOP,
                alignment: ALIGNMENT_START
            });
        });

        it('should use center alignment if it is the only possibility', () => {
            elementRect.right = 90;
            zoneElementRect.left = 10;
            zoneElementRect.right = 90;
            expect(getLocationForElementAroundZone(element, zoneElement, SIDE_TOP, ALIGNMENT_START, 0, windowMock)).toEqual({
                side: SIDE_TOP,
                alignment: ALIGNMENT_CENTER
            });
        });

        it('should use start alignment it is the only possibility', () => {
            elementRect.right = 90;
            zoneElementRect.left = 0;
            zoneElementRect.right = 80;
            expect(getLocationForElementAroundZone(element, zoneElement, SIDE_TOP, ALIGNMENT_CENTER, 0, windowMock)).toEqual({
                side: SIDE_TOP,
                alignment: ALIGNMENT_START
            });
        });

        it('should use center alignment it is the only possibility with spacing', () => {
            elementRect.right = 89;
            zoneElementRect.left = 10;
            zoneElementRect.right = 90;
            expect(getLocationForElementAroundZone(element, zoneElement, SIDE_TOP, ALIGNMENT_START, 1, windowMock)).toEqual({
                side: SIDE_TOP,
                alignment: ALIGNMENT_CENTER
            });
        });

        it('should use start alignment when right is the only possibility and rtl', () => {
            elementRect.right = 90;
            zoneElementRect.left = 20;
            zoneElementRect.right = 100;
            windowMock.languageDirection = 'RTL';
            expect(getLocationForElementAroundZone(element, zoneElement, SIDE_TOP, ALIGNMENT_CENTER, 0, windowMock)).toEqual({
                side: SIDE_TOP,
                alignment: ALIGNMENT_START
            });
        });
    });
});