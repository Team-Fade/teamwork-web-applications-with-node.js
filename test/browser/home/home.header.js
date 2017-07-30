/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const { setupDriver } = require('../utils/setup-driver');
const webdriver = require('selenium-webdriver');

describe('Home route', () => {
    let driver = null;

    const appUrl = 'http://localhost:3002/home';

    beforeEach(() => {
        driver = setupDriver('chrome');
        return driver.get(appUrl);
    });

    afterEach(() => {
        driver.quit();
    });

    it('expect header to have name element "#navbar"', (done) => {
        driver.findElement(
            webdriver.By.css('#navbar'))
            .then((el) => {
                expect(el).to.not.be.undefined;
                done();
            });
    });

    it('expect header to have name element "#nav - mobile"', (done) => {
        driver.findElement(
            webdriver.By.css('#nav-mobile'))
            .then((el) => {
                expect(el).to.not.be.undefined;
                done();
            });
    });

    it('expect header to have name "Fade"', (done) => {
        driver.findElement(
            webdriver.By.className('brand-logo'))
            .then((el) => {
                return el.getText();
            })
            .then((text) => {
                expect(text).to.contain('Fade');
                done();
            });
    });
});
