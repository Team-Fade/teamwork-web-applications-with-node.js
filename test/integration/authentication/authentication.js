const { init } = require('../../../app');
const request = require('supertest');
const { expect } = require('chai');

describe('Authentication routes tests,', () => {
    const connectionString = 'mongodb://localhost/nodejs-teamwork-test';
    let app = null;
    beforeEach(() => {
        return Promise.resolve()
            .then(() => require('../../../db').init(connectionString))
            .then((db) => require('../../../data').init(db))
            .then((data) => require('../../../app').init(data))
            .then((_app) => {
                app = _app;
            });
    });

    describe('POST /login', () => {
        it('expect to return 302', (done) => {
            request(app)
                .post('/login')
                .send({
                    username: 'Pesho',
                    password: 'pesho123',
                })
                .expect(302)
                .end((err) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('GET /logout', () => {
        it('expect to return 302', (done) => {
            request(app)
                .get('/logout')
                .expect(302)
                .end((err) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('POST /register', () => {
        it('expect to return 302', (done) => {
            request(app)
                .post('/register')
                .send({
                    username: 'pesho',
                    password: 'pesho123',
                    firstName: 'Pesho',
                    lastName: 'Peshov',
                    city: 'Varna',
                    email: 'peshoto@gmail.com',
                })
                .expect(302)
                .end((err) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });
});
