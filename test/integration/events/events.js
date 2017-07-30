const { init } = require('../../../app');
const request = require('supertest');
const { expect } = require('chai');

describe('Events routes tests,', () => {
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

    describe('GET /browse', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/browse')
                .expect(200)
                .end((err) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });
    describe('GET /create', () => {
        it('expect to return 302', (done) => {
            request(app)
                .get('/create')
                .expect(302)
                .end((err) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });
    describe('POST /create', () => {
        it('expect to return 302', (done) => {
            request(app)
                .post('/create')
                .expect(302)
                .end((err) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('PUT /:id/:action', () => {
        it('expect to return 302', (done) => {
            request(app)
                .put('/:id/:action')
                .expect(302)
                .end((err) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('DELETE /:id/:action', () => {
        it('expect to return 302', (done) => {
            request(app)
                .del('/:id/:action')
                .expect(302)
                .end((err) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });
    describe('GET /manage/:id', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/manage/:id')
                .expect(302)
                .end((err) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('POST /manage/:id', () => {
        it('expect to return 200', (done) => {
            request(app)
                .post('/manage/:id')
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
