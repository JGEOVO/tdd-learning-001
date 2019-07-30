const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const request = require('supertest');
const app = require('../../app');
const util = require('./../../util');


describe('POST /userssample/subscribesample', () => {
  const enpointRoute = `/userssample/subscribesample`;
  const validInput = { body: { email: 'asd@asd.com', name: 'Jorge' } };
  const invalidInput = { body: { foo: 'bar' } };

  beforeEach(() => {
    sinon.spy(util, "validateRequest");
  });
  afterEach(() => {
    util.validateRequest.restore();
  });
  describe('When the request has invalid input data', () => {
    it('should call util.validateRequest to make the schema validation of the request', async () => {
      const res = await request(app)
        .post(enpointRoute)
        .send(invalidInput.body);
      expect(util.validateRequest.called).to.eql(true);
    });
    it('should return a 400 status code', async () => {
      const res = await request(app)
        .post(enpointRoute)
        .send(invalidInput.body);
      expect(res.status).to.eql(400);
    });
  });


  describe('When the request has valid input data', () => {
    it('should return a 200 status code', async () => {
      const res = await request(app)
        .post(enpointRoute)
        .send(validInput.body);
      expect(res.status).to.eql(200);
    });
  });
});