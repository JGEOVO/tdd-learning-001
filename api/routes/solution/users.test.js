const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const request = require('supertest');
const app = require('../../app');


test('two plus two is four', () => {
    expect(2 + 2).to.eql(4);
  });

  describe('POST /users/subscribe', () => {
    const enpointRoute = `/users/subscribe`;
    const validInput = {body:{email:'asd@asd.com'}};
    it('should return a 200 status code', async () => {
      const res = await request(app)
        .post(enpointRoute)
        .send(validInput.body)
      expect(res.status).to.eql(200);
    });
  });