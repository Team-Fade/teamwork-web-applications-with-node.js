const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);
const should = chai.should();
const expect = chai.expect;
const { init } =
    require('../../../../../app/controllers/events.controller');

describe('events controller', () => {
    let controller;
    let data;
    let req = null;
    let res = null;

    describe('if user who wants to join this event is the author', () => {
        beforeEach(() => {
            const event = {
                author: 'testAuthor',
            };

            data = {
                events: {
                    getOne() {
                        return Promise.resolve(event);
                    },
                    edit() {

                    },
                },
            };

            controller = init(data);

            const reqOptions = {
                params: {
                    id: 1,
                    action: 'join',
                },
                flash: () => {

                },
            };

            req = require('../../../req-res')
                .getRequestMock(reqOptions);
            res = require('../../../req-res')
                .getResponseMock();

            res.locals.user.username = 'testAuthor';
        });

        it('expect joinEvent() to redirect to /browse', () => {
            controller.joinEvent(req, res)
                .then(() => {
                    expect(res.redirectUrl).to.be.equal('/browse');
                });
        });
    });

    describe('if user who wants to join this event is not the author', () => {
        beforeEach(() => {
            const event = {
                author: 'test',
            };

            data = {
                events: {
                    getOne() {
                        return Promise.resolve(event);
                    },
                    edit() {
                        return Promise.resolve(event);
                    },
                },
            };

            controller = init(data);

            const reqOptions = {
                params: {
                    id: 1,
                    action: 'join',
                },
                flash: () => {

                },
            };

            req = require('../../../req-res')
                .getRequestMock(reqOptions);
            res = require('../../../req-res')
                .getResponseMock();

            res.locals.user.username = 'newAuthor';
        });

        it('expect joinEvent() to add the user in event participants', () => {
            controller.joinEvent(req, res)
                .then((result) => {
                    expect(result.author).to.include('test');
                });
        });
    });
});
