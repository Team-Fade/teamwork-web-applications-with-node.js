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
    let spy;

    describe('if param action is leave', () => {
        beforeEach(() => {
            const event = {
                participants: ['testUser'],
            };

            data = {
                events: {
                    edit() {
                        return Promise.resolve(event);
                    },
                },
            };

            controller = init(data);

            const reqOptions = {
                params: {
                    id: 1,
                    action: 'leave',
                },
                flash: () => {

                },
            };

            req = require('../../../req-res')
                .getRequestMock(reqOptions);
            res = require('../../../req-res')
                .getResponseMock();
            res = require('../../../req-res')
                .getResponseMock();

            res.locals.user.username = 'newAuthor';
        });

        it('expect leaveEvent() to delete user from participants', () => {
            controller.leaveEvent(req, res)
                .then((result) => {
                    expect(result.participants).to.include('testUser');
                });
        });
    });

    describe('if param action is not leave', () => {
        beforeEach(() => {
            const event = {
                author: 'testUser',
                participants: ['testUser'],
            };

            data = {
                events: {
                    edit() {
                        return Promise.resolve(event);
                    },
                    getOne() {
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
            res = require('../../../req-res')
                .getResponseMock();

            res.locals.user.username = 'testUser';
            spy = chai.spy(controller.joinEvent(req, res));
        });

        it('expect leaveEvent() to call joinEvent()', () => {
            controller.leaveEvent(req, res)
                .then((result) => {
                    expect(spy).to.have.been.called();
                });
        });
    });
});
