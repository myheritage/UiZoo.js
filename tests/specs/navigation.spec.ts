import { browser } from 'protractor/built';
import { BASE_URL } from '../conf';

describe("navigation", () => {
    it("should have the initial title as Welcome", () => {
        expect(browser.$(".library-_-component-name").getText()).toEqual("Welcome to UiZoo.js!");
    });

    it("should have all the components listed in the links section", () => {
        let linksText = browser.$(".library-_-components-links").getText();
        expect(linksText).toContain("CodeCard");
        expect(linksText).toContain("RaisedButton");
    });

    it("should have only matching components in the links section when searching", () => {
        browser.$(".library-_-components-search-bar textarea").sendKeys("Card");
        let linksText = browser.$(".library-_-components-links").getText();
        expect(linksText).toContain("CodeCard");
        expect(linksText).not.toContain("RaisedButton");
    });

    it("should show a chosen component when clicking on the component in the side", () => {
        browser.$(".library-_-components-search-bar textarea").sendKeys("CodeCard");
        browser.$(".library-_-component-link button").click();
        expect(browser.$(".library-_-component-name").getText()).toEqual("CodeCard");
        expect(browser.getCurrentUrl()).toEqual(BASE_URL + "/CodeCard");
    });

    it("should show a chosen component when going directly to its url", () => {
        browser.get(BASE_URL + "/CodeCard");
        expect(browser.$(".library-_-component-name").getText()).toEqual("CodeCard");
    });

    it("should mark the component as chosen in the naviagtion", () => {
        browser.get(BASE_URL + "/CodeCard");
        expect(browser.$(".library-_-component-link.selected").getText()).toEqual("CodeCard");
    });

    it("should take back home when clicking on the logo", () => {
        browser.get(BASE_URL + "/CodeCard");
        browser.$(".library-_-title").click();
        expect(browser.$(".library-_-component-name").getText()).toEqual("Welcome to UiZoo.js!");
    });
});