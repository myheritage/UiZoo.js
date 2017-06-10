import {renderIntoDocument, Simulate} from 'react-addons-test-utils';
import {findDOMNode} from 'react-dom';
import {
    initAutoLocationDetectorMock,
    getGetLocationForElementAroundZoneMock
} from './autoLocationDetector/autoLocationDetectorMock';
import AutoLocationTooltip from './index';
import {SIDE_TOP, SIDE_BOTTOM, ALIGNMENT_CENTER, ALIGNMENT_START} from './locationConstants';
import {TRIGGER_EVENT_CLICK} from './Tooltip/constants';

let getLocationForElementAroundZoneMock;

describe('AutoLocationTooltip', () => {
    initAutoLocationDetectorMock();
    beforeEach(() => {
        getLocationForElementAroundZoneMock = getGetLocationForElementAroundZoneMock();
        getLocationForElementAroundZoneMock.and.returnValue({side: SIDE_BOTTOM, alignment: ALIGNMENT_START});
    });

    describe('creating the element', () => {
        it('should call callback onAfterTooltipOpen after tooltip opening and update side & alignment', () => {
            let onAfterTooltipOpenSpy = jasmine.createSpy('onAfterTooltipOpen');
            let autoLocationTooltip = renderIntoDocument(
                <AutoLocationTooltip
                    tooltip={'tooltip'}
                    side={SIDE_TOP}
                    alignment={ALIGNMENT_CENTER}
                    onAfterTooltipOpen={onAfterTooltipOpenSpy}
                    trigger={TRIGGER_EVENT_CLICK}>
                    inside text
                </AutoLocationTooltip>
            );

            expect(autoLocationTooltip.state).toEqual({side: SIDE_TOP, alignment: ALIGNMENT_CENTER});
            let autoLocationTooltipInDom = findDOMNode(autoLocationTooltip);
            Simulate.click(autoLocationTooltipInDom);
            expect(onAfterTooltipOpenSpy).toHaveBeenCalled();
            expect(autoLocationTooltip.state).toEqual({side: SIDE_BOTTOM, alignment: ALIGNMENT_START});
        });
    });
});