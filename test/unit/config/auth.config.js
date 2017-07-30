// const { expect } = require('chai');
// const sinon = require('sinon');
// const configureAuthentification = require('../../../config/auth.config');

// describe('auth.config.js', () => {
//     let data;
//     let app;

//     beforeEach(() => {
//         data = {
//             users: {
//                 collection: {
//                     findOne() {
//                         return Promise.resolve({ user: 'test' });
//                     },
//                 },
//             },
//         };

//         sinon
//             .stub(app, 'use')
//             .callsFake(() => {
//                 return {};
//             });

//             it('expect to authenticate properly user', () => {
//             configureAuthentification(app, data)
//                 .then((result) => {
//                     expect(result).to.not.throw();
//                 });
//         });
//     });
// });
