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

    it('expect button with text "Login" to redirect to http://localhost:3002/login', (done) => {
        driver.findElement(
            webdriver.By.css('#login-btn'))
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.getCurrentUrl();
            })
            .then((currentUrl) => {
                expect(currentUrl).to.equal('http://localhost:3002/login');
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

    it('expect button with name "Browse more" to redirect to http://localhost:3002/events/browse',
        (done) => {
            driver.get(appUrl)
                .then(() => {
                    return driver.findElement(
                        webdriver.By.css('#browse-events-btn')
                    );
                })
                .then((el) => {
                    return el.click();
                })
                .then(() => {
                    return driver.getCurrentUrl();
                })
                .then((currentUrl) => {
                    expect(currentUrl).to.equal('http://localhost:3002/events/browse');
                    done();
                });
        });
});
