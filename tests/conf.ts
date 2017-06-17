import * as failFast from 'protractor-fail-fast';
import { Config } from 'protractor';
import { browser } from 'protractor/built';

export const BASE_URL = 'http://localhost:5000';
export const WAIT_TIME = 3000;

export let config: Config = {
    framework: 'jasmine',
    plugins: [
        failFast.init(),
    ],
    capabilities: {
        browserName: 'chrome'
    },
    specs: [
        'specs/**/*spec.js'
    ],
    seleniumAddress: 'http://localhost:4444/wd/hub',
    onPrepare() {
        beforeEach(() => {
            browser.waitForAngularEnabled(false);
            browser.get(BASE_URL);
        });
    },
    afterLaunch: () => {
        failFast.clean(); 
    },
    noGlobals: true
};