/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const { setupDriver } = require('../utils/setup-driver');
const webdriver = require('selenium-webdriver');

describe('Home routes', () => {
    let driver = null;

    const appUrl = 'http://localhost:3002/';

    beforeEach(() => {
        driver = setupDriver('chrome');
    });

    it('expect header to have link to home with name "Home"', (done) => {
        driver.get(appUrl)
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('navbar-home')
                );
            })
            .then((el) => {
                return el.getText();
            })
            .then((text) => {
                expect(text).to.contain('Home');
                done();
            });
    });
});
