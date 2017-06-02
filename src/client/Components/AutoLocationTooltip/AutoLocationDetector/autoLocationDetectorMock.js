import * as OriginalAutoLocationDetector from './autoLocationDetector';

let originalGetLocationForElementAroundZone = null,
    getLocationForElementAroundZoneMock;

export function initAutoLocationDetectorMock () {
    beforeEach(() => {
        getLocationForElementAroundZoneMock = null;
        originalGetLocationForElementAroundZone = OriginalAutoLocationDetector.getLocationForElementAroundZone;
        getLocationForElementAroundZoneMock = getGetLocationForElementAroundZoneMock();
        OriginalAutoLocationDetector.getLocationForElementAroundZone = getLocationForElementAroundZoneMock;
    });

    afterEach(() => {
        OriginalAutoLocationDetector.getLocationForElementAroundZone = originalGetLocationForElementAroundZone;
    });
}

export function getGetLocationForElementAroundZoneMock() {
    return getLocationForElementAroundZoneMock || jasmine.createSpy();
}