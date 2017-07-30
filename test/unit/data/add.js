const { expect } = require('chai');
const sinon = require('sinon');

const UsersData = require('../../../data/users.data');


describe('Add new user', () =>{
    let userModelMock = null;
    const db = null;

    beforeEach(() => {
        const data = new UsersData(db);        
    });

    it('Expect to return added user', () => {
    });
});
