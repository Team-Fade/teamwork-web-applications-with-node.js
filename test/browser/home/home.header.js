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

    it('expect body to button with text "Login"', (done) => {
        driver.findElement(
            webdriver.By.css('#login-btn'))
            .then((el) => {
                return el.getText();
            })
            .then((text) => {
                expect(text).to.contain('LOGIN');
                done();
            });
    });

    it(`expect body to conitan text 
    "Check out our top rated events"`, (done) => {
            driver.findElement(
                webdriver.By.css('body > main > div.flow-text > p'))
                .then((el) => {
                    return el.getText();
                })
                .then((text) => {
                    expect(text)
                        .to.deep.contain('Check out our top rated events');
                    done();
                });
        });

    it('expect body to have button with name "Browse more"',
        (done) => {
            driver.get(appUrl)
                .then(() => {
                    return driver.findElement(
                        webdriver.By.css('#browse-events-btn')
                    );
                })
                .then((el) => {
                    return el.getText();
                })
                .then((text) => {
                    expect(text).to.deep.equal('BROWSE MORE');
                    done();
                });
        });
});
