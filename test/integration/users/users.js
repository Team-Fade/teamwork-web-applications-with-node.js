const { init } = require('../../../app');
const request = require('supertest');
const { expect } = require('chai');

describe('Users routes tests,', () => {
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

    describe('GET /profile', () => {
        it('expect to return 302', (done) => {
            request(app)
                .get('/profile')
                .auth('mike1', 'mike123')
                .expect(302)
                .end((err) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('GET /user/profile/my-events', () => {
        it('expect to return 302', (done) => {
            request(app)
                .get('/user/profile/my-events')
                .auth('mike1', 'mike123')
                .expect(302)
                .end((err) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });
    describe('GET /user/profile/edit', () => {
        it('expect to return 302', (done) => {
            request(app)
                .get('/user/profile/edit')
                .auth('mike1', 'mike123')
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
