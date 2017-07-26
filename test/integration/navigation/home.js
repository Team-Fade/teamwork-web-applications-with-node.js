const { init } = require('../../../app');
const request = require('supertest');
const { expect } = require('chai');

describe('/home tests,', () => {
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

    describe('GET /', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/')
                .expect(200)
                .end((err) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('GET /home', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/home')
                .expect(200)
                .end((err) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });
});
