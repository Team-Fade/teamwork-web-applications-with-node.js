const { expect } = require('chai');
const { init } =
    require('../../../../../app/controllers/authentication.controller');

describe('authentication controller', () => {
    let controller;
    let data;
    let req = null;
    let res = null;
    let next = null;

    describe('if invalid user is passed', () => {
        beforeEach(() => {
            data = {
                users: {

                },
            };

            const reqOptions = {
                body: {
                    username: '',
                    password: '',
                    email: '',
                    firstName: '',
                    lastName: '',
                    city: '',
                },
                flash: () => {

                },
            };

            controller = init(data);

            req = require('../../../req-res')
                .getRequestMock(reqOptions);
            res = require('../../../req-res')
                .getResponseMock();
        });

        it('expect register() redirect to /register', () => {
            controller.register(req, res);
            expect(res.redirectUrl).to.be.equal('/register');
        });
    });

    describe('if valid user that already exists is passed', () => {
        beforeEach(() => {
            const user = {
                username: 'testUser',
            };

            next = () => {

            };

            data = {
                users: {
                    getOne() {
                        return Promise.resolve(user);
                    },
                },
            };

            const reqOptions = {
                body: {
                    username: 'testUser',
                    password: 'testUser',
                    email: 'testUser',
                    firstName: 'testUser',
                    lastName: 'testUser',
                    city: 'testUser',
                },
                flash: () => {

                },
            };

            controller = init(data);

            req = require('../../../req-res')
                .getRequestMock(reqOptions);
            res = require('../../../req-res')
                .getResponseMock();
        });

        it('expect register() redirect to /register', () => {
            return controller.register(req, res, next)
                .then(() => {
                    expect(res.redirectUrl).to.be.equal('/register');
                });
        });
    });

    describe('if valid user that does not exists is passed', () => {
        beforeEach(() => {
            const user = {
                username: 'testUser',
                password: 'testUser',
                email: 'testUser',
                firstName: 'testUser',
                lastName: 'testUser',
                city: 'testUser',
                profileImage: '',
            };

            next = () => {

            };

            data = {
                users: {
                    getOne() {
                        return Promise.resolve();
                    },
                    add() {
                        return Promise.reject();
                    },
                },
            };

            const reqOptions = {
                body: {
                    username: 'testUser',
                    password: 'testUser',
                    email: 'testUser',
                    firstName: 'testUser',
                    lastName: 'testUser',
                    city: 'testUser',
                },
                flash: () => {

                },
            };

            controller = init(data);

            req = require('../../../req-res')
                .getRequestMock(reqOptions);
            res = require('../../../req-res')
                .getResponseMock();
        });

        it('expect register() to catch error if user cannot be added in db', () => {
            return controller.register(req, res, next)
                .catch((err) => {
                    expect(res.redirectUrl).to.be.equal('/register');
                });
        });
    });

    describe('if valid user that does not exists is passed', () => {
        beforeEach(() => {
            const user = {
                username: 'testUser',
                password: 'testUser',
                email: 'testUser',
                firstName: 'testUser',
                lastName: 'testUser',
                city: 'testUser',
                profileImage: '',
            };

            next = () => {

            };

            data = {
                users: {
                    getOne() {
                        return Promise.resolve();
                    },
                    add() {
                        return Promise.resolve(user);
                    },
                },
            };

            const reqOptions = {
                body: {
                    username: 'testUser',
                    password: 'testUser',
                    email: 'testUser',
                    firstName: 'testUser',
                    lastName: 'testUser',
                    city: 'testUser',
                },
                flash: () => {

                },
            };

            controller = init(data);

            req = require('../../../req-res')
                .getRequestMock(reqOptions);
            res = require('../../../req-res')
                .getResponseMock();
        });

        it('expect register() on success to do not throw', () => {
            return controller.register(req, res, next)
                .then()
                .then(() => {
                    expect(req.flash).to.not.have.property('register');
                });
        });
    });
});
