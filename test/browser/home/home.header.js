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
    it('expect header to have link to about us page with name "About us"',
        (done) => {
            driver.get(appUrl)
                .then(() => {
                    return driver.findElement(
                        webdriver.By.id('navbar-about')
                    );
                })
                .then((el) => {
                    return el.getText();
                })
                .then((text) => {
                    expect(text).to.contain('About us');
                    done();
                });
    });
    it('expect header to have link to about us page with name "Chat"',
        (done) => {
            driver.get(appUrl)
                .then(() => {
                    return driver.findElement(
                        webdriver.By.id('navbar-chat')
                    );
                })
                .then((el) => {
                    return el.getText();
                })
                .then((text) => {
                    expect(text).to.contain('Chat');
                    done();
                });
    });
    it('expect home to have link to browse events page with name "Browse more"',
        (done) => {
            driver.get(appUrl)
                .then(() => {
                    return driver.findElement(
                        webdriver.By.id('browse-events-btn')
                    );
                })
                .then((el) => {
                    return el.getText();
                })
                .then((text) => {
                    expect(text).to.contain('Browse more');
                    done();
                });
    });
});
