import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import {SIDE_BOTTOM, TRIGGER_EVENT_CLICK, TRIGGER_EVENT_HOVER} from './constants';
import Tooltip from './index';

describe('Tooltip', () => {
    describe('creating the element', () => {
        it('should call callback when opening the tooltip', () => {
            let spy = jasmine.createSpy();
            let tooltip = ReactTestUtils.renderIntoDocument(
                <Tooltip tooltip={'tooltip'} side={SIDE_BOTTOM} onTooltipOpen={spy}>
                    inside text
                </Tooltip>
            );
            expect(tooltip.props.side).toBe(SIDE_BOTTOM);
            tooltip.componentWillUpdate({}, {showTooltip: false});
            expect(spy).not.toHaveBeenCalled();
            tooltip.componentWillUpdate({}, {showTooltip: true});
            expect(spy).toHaveBeenCalled();
        });

        it('should show tooltip on showTooltip change', () => {
            let spy = jasmine.createSpy();
            const tooltip = ReactTestUtils.renderIntoDocument(
                <Tooltip tooltip={'tooltip'} side={SIDE_BOTTOM} onTooltipOpen={spy} trigger={TRIGGER_EVENT_CLICK}>
                    inside text
                </Tooltip>
            );
            let tooltipInDom = ReactDOM.findDOMNode(tooltip);
            expect(tooltipInDom.children.length).toBe(0);
            tooltip.setState({showTooltip: true});
            expect(tooltipInDom.children[0].className).toBe('tooltip_spacing_wrapper side_bottom alignment_center');
            tooltip.setState({showTooltip: false});
            expect(tooltipInDom.children.length).toBe(0);
        });

        it('should show change the state on click with click trigger', () => {
            let spy = jasmine.createSpy();
            const tooltip = ReactTestUtils.renderIntoDocument(
                <Tooltip tooltip={'tooltip'} side={SIDE_BOTTOM} onTooltipOpen={spy} trigger={TRIGGER_EVENT_CLICK}>
                    inside text
                </Tooltip>
            );
            let tooltipInDom = ReactDOM.findDOMNode(tooltip);
            ReactTestUtils.Simulate.click(tooltipInDom);
            expect(tooltip.state.showTooltip).toBeTruthy();
            ReactTestUtils.Simulate.blur(tooltipInDom);
            expect(tooltip.state.showTooltip).toBeFalsy();
        });

        it('should show change the state on click with click trigger', () => {
            let spy = jasmine.createSpy();
            const tooltip = ReactTestUtils.renderIntoDocument(
                <Tooltip tooltip={'tooltip'} side={SIDE_BOTTOM} onTooltipOpen={spy} trigger={TRIGGER_EVENT_HOVER}>
                    inside text
                </Tooltip>
            );
            let tooltipInDom = ReactDOM.findDOMNode(tooltip);
            ReactTestUtils.Simulate.mouseOver(tooltipInDom);
            expect(tooltip.state.showTooltip).toBeTruthy();
            ReactTestUtils.Simulate.mouseLeave(tooltipInDom);
            expect(tooltip.state.showTooltip).toBeFalsy();
        });
    });
});