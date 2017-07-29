const { expect } = require('chai');
const { init } =
    require('../../../../../app/controllers/authentication.controller');

describe('authentication controller', () => {
    let controller;
    let data;
    let req = null;
    let res = null;

    beforeEach(() => {
        data = {
            users: {

            },
        };

        const reqOptions = {
            session: {
                destroy() {
                    return Promise.resolve(res.redirect('/'));
                },
            },
        };

        controller = init(data);

        req = require('../../../req-res')
            .getRequestMock(reqOptions);
        res = require('../../../req-res')
            .getResponseMock();
    });

    it('expect logout() to call session.destroy and redirect to /', () => {
        controller.logout(req, res);
        expect(res.redirectUrl).to.be.equal('/');
    });
});
