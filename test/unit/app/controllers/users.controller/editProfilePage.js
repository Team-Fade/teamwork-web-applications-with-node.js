const { expect } = require('chai');
const { init } =
    require('../../../../../app/controllers/users.controller');

describe('users controller', () => {
    let controller;
    let data = null;
    let req = null;
    let res = null;

    describe('if user is logged in and email already exists', () => {
        beforeEach(() => {
            data = {
                users: {
                    getOne() {
                        return Promise.resolve({});
                    },
                    edit() {

                    },
                },
            };

            const reqOptions = {
                body: {
                    email: 'test@abv.bg',
                    password: 'newTestPassword',
                },
                flash: () => {

                },
            };

            controller = init(data);

            req = require('../../../req-res')
                .getRequestMock(reqOptions);
            res = require('../../../req-res')
                .getResponseMock();

            res.locals.user.username = 'testUser';
        });

        it('expect editProfilePage() to redirect to /user/profile/edit', () => {
            return controller.editProfilePage(req, res)
                .then(() => {
                    expect(res.redirectUrl).to.be.equal('/user/profile/edit');
                });
        });
    });

    describe('if user is logged in and email does not exist', () => {
        beforeEach(() => {
            data = {
                users: {
                    getOne() {
                        return Promise.resolve();
                    },
                    edit() {

                    },
                },
            };

            const reqOptions = {
                body: {
                    email: 'test@abv.bg',
                    password: 'newTestPassword',
                },
                flash: () => {

                },
                session: {
                    passport: {
                        user: {
                            email: '',
                        },
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

        it('expect editProfilePage() to redirect to /user/profile/edit and set in session the new email', () => {
            return controller.editProfilePage(req, res)
                .then(() => {
                    expect(res.redirectUrl).to.be.equal('/user/profile/edit');
                    expect(req.session.passport.user.email).to.be.equal('test@abv.bg');
                });
        });
    });
});
