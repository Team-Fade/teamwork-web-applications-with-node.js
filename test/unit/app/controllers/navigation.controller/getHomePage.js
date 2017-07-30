const { expect } = require('chai');
const { init } =
    require('../../../../../app/controllers/navigation.controller');

describe('Controllers tests: ', () => {
    describe('Navigation controller: ', () => {
        let controller;
        let data;
        let req = null;
        let res = null;

        before(() => {
            data = {
                events: {
                    sortEventsByParticipants() {
                        return Promise.resolve({});
                    },
                },
            };

            const reqOptions = {
                session: {
                    passport: {
                        user: 'testUser',
                    },
                },
            };

            controller = init(data);

            req = require('../../../req-res')
                .getRequestMock(reqOptions);
            res = require('../../../req-res')
                .getResponseMock();
        });

        it('expect getHomePage() to render navigation/home', () => {
            controller.getHomePage(req, res)
                .then(() => {
                    expect(res.viewName).to.be.equal('navigation/home');
                    expect(res.context.user).to.be.equal('testUser');
                });
        });
    });
});

