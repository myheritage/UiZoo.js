import { browser } from 'protractor/built';
import { BASE_URL, WAIT_TIME } from '../conf';

describe("component review", () => {
    beforeEach(() => {
        browser.get(BASE_URL + "/Tooltip");
    });

    it("should show the component description from the jsdoc", () => {
        expect(browser.$(".bibliotheca-component-description").getText()).toContain("Tooltip to be shown on");
    });

    it("should prefill the params from the example values", () => {
        expect(browser.$("[data-param=tooltip] > :nth-child(2)").getText()).toEqual("tooltip inner text!");
        expect(browser.$("[data-param=children] > :nth-child(2)").getText()).toEqual("Click me to open the tooltip!");
    });
    
    it("should copy values from the example when clicking on the try-it", () => {
        browser.$(".bibliotheca-component-example:nth-child(2) button").click();
        expect(browser.$("[data-param=side] .selected").getText()).toEqual("bottom");
    });

    it("should modify the source code to be the same as the chosen params", () => {
        browser.$("[data-param=side] button:nth-child(2)").click();
        expect(browser.$(".bibliotheca-component-source-code pre").getText()).toContain("side='top'");
    });

    describe("component content", () => {
        it("should take a string value from params and show it on the example", () => {
            let input = browser.$("[data-param=tooltip] textarea");
            input.clear();
            input.sendKeys("Value");

            browser.$(".bibliotheca-component-content .bibliotheca-tooltip-wrapper").click();
            // the input has debounce so we have to wait for the text to appear on the tooltip
            browser.wait(browser.ExpectedConditions.textToBePresentInElement(browser.$(".bibliotheca-component-content .bibliotheca-tooltip-body"), "Value"), WAIT_TIME);
        });

        it("should take an array from params and show it on the example", () => {
            let input = browser.$("[data-param=tooltip] textarea");
            input.clear();
            input.sendKeys("[1, 2]");

            browser.$(".bibliotheca-component-content .bibliotheca-tooltip-wrapper").click();
            // the input has debounce so we have to wait for the text to appear on the tooltip
            browser.wait(browser.ExpectedConditions.textToBePresentInElement(browser.$(".bibliotheca-component-content .bibliotheca-tooltip-body"), "12"), WAIT_TIME);
        });

        // it("should take an object from params and show it", () => {
        //     // need to finalize its syntax
        // });

        it("should switch when there's a menu params and show the chosen menu item", () => {
            // change click to hover
            browser.$("[data-param=trigger] button:nth-child(3)").click();
            browser.actions().mouseMove(browser.$(".bibliotheca-component-content .bibliotheca-tooltip-wrapper")).perform();

            expect(browser.$(".bibliotheca-component-content .bibliotheca-tooltip-body").getText()).toEqual("tooltip inner text!");
        });

        it("should allow passing function as param", () => {
            browser.$("[data-param=onTooltipOpen] textarea").sendKeys("() => alert('alerted')");
            let children = browser.$("[data-param=children] textarea");
            children.clear();
            children.sendKeys("Children");

            let $element = browser.$(".bibliotheca-component-content .bibliotheca-tooltip-wrapper");
            browser.wait(browser.ExpectedConditions.textToBePresentInElement($element, "Children"), WAIT_TIME);
            // after we know the children has switched, we know the function input also has
            $element.click();
            let alert = browser.switchTo().alert();
            expect(alert.getText()).toEqual("alerted");
            alert.accept();
        });
    });
});