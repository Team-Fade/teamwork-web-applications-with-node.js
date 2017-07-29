const { expect } = require('chai');
const { init } =
    require('../../../../../app/controllers/users.controller');

describe('users controller', () => {
    let controller;
    let data = null;
    let req = null;
    let res = null;

    describe('if user is logged in', () => {
        beforeEach(() => {
            data = {

            };

            controller = init(data);

            req = require('../../../req-res')
                .getRequestMock();
            res = require('../../../req-res')
                .getResponseMock();
        });

        it('expect getProfilePage() to render users/profile', () => {
            controller.getProfilePage(req, res);
            expect(res.viewName).to.be
                .equal('users/profile');
        });
    });
});
