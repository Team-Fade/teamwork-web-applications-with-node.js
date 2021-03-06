const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);
const expect = chai.expect;

const { init } =
    require('../../../../../app/controllers/events.controller');

describe('Controllers tests: ', () => {
    describe('Events controller: ', () => {
        let controller;
        let data;
        let req = null;
        let res = null;

        describe('if param action is leave', () => {
            before(() => {
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
    });
});

