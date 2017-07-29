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
                users: {
                    getOne() {

                    },
                    edit() {

                    },
                },
            };

            const reqOptions = {
                body: {
                    email: 'newTestEmail',

                },
                flash: () => {

                },
                file: {
                    path: {

                    },
                },
            };

            controller = init(data);

            req = require('../../../req-res')
                .getRequestMock(reqOptions);
            res = require('../../../req-res')
                .getResponseMock();

            res.locals.user.username = 'testUser';
        });

        it('expect editProfilePage() to render users/my-events with the events', () => {
            controller.editProfilePage(req, res)
                .then(() => {
                    expect(res.redirectUrl).to.be.equal('/user/profile/edit');
                });
        });
    });
});
