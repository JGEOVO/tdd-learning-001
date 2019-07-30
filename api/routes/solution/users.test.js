const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const request = require('supertest');
const app = require('../../app');


describe('POST /users/subscribe', () => {
  const enpointRoute = `/users/subscribe`;
  const validInput = { body: { email: 'asd@asd.com', name: 'Jorge' } };
  const invalidInput = { body: { foo: 'bar' } };

  describe('When the request has invalid input data', () => {
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