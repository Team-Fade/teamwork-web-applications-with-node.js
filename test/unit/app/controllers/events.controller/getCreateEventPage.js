const { expect } = require('chai');
const { init } =
    require('../../../../../app/controllers/events.controller');

describe('events controller', () => {
    let controller;

    let req = null;
    let res = null;

    beforeEach(() => {
        controller = init();

        req = require('../../../req-res')
            .getRequestMock();
        res = require('../../../req-res')
            .getResponseMock();
    });

    it('expect getCreateEventPage() to render the proper view', () => {
        controller.getCreateEventPage(req, res);
        expect(res.viewName).to.be.equal('events/create-event');
    });
});
