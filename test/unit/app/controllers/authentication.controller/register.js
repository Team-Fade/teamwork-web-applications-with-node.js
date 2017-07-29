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
            return controller.register(req, res, next)
                .then((result) => {
                    expect(res.redirectUrl).to.be.equal('/register');
                });
        });
    });
});
