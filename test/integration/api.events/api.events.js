// const { init } = require('../../../app');
const request = require('supertest');
// const { expect } = require('chai');

describe('Api routes tests,', () => {
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

    describe('GET /api/events', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/api/events')
                .expect(200)
                .end((err) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('GET /api/filter-events', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/api/filter-events')
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
