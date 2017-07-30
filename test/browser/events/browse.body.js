/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const { setupDriver } = require('../utils/setup-driver');
const webdriver = require('selenium-webdriver');

describe('Browse events route', () => {
    let driver = null;

    const appUrl = 'http://localhost:3002/events/browse';

    beforeEach(() => {
        driver = setupDriver('chrome');
        return driver.get(appUrl);
    });

    afterEach(() => {
        driver.quit();
    });

    it('expect body to have search input for the event name', (done) => {
        driver.findElement(
            webdriver.By.css('#eventName'))
            .then((el) => {
                expect(el).to.not.be.undefined;
                done();
            });
    });

    it('expect body to have search input for the event location', (done) => {
        driver.findElement(
            webdriver.By.css('#eventLocation'))
            .then((el) => {
                expect(el).to.not.be.undefined;
                done();
            });
    });

    it('expect body to have search input for the event type', (done) => {
        driver.findElement(
            webdriver.By.css('#eventType'))
            .then((el) => {
                expect(el).to.not.be.undefined;
                done();
            });
    });

        it('expect body to have search input for the event date', (done) => {
        driver.findElement(
            webdriver.By.css('#eventDate'))
            .then((el) => {
                expect(el).to.not.be.undefined;
                done();
            });
    });
});
