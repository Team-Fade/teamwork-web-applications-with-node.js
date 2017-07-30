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

        it('expect getAboutUsPage() to render navigation/about', () => {
            controller.getAboutUsPage(req, res);
            expect(res.viewName).to.be.equal('navigation/about');
            expect(res.context.user).to.be.equal('testUser');
        });
    });
});
