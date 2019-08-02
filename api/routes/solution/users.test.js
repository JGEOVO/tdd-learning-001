const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const request = require('supertest');
const app = require('../../app');
const util = require('./../../util');
const mongoose = require('mongoose');
const userModel = require('./../../models/users');
mongoose.Promise = global.Promise;

describe('POST /userssample/subscribesample', () => {
  const enpointRoute = `/userssample/subscribesample`;

  beforeEach(() => {
    sinon.spy(util, 'validateRequest');
  });
  afterEach(() => {
    util.validateRequest.restore();
  });
  describe('When the request has invalid input data', () => {
    describe("When the request doesn't have the expected body fields", () => {
      const invalidInput = { body: { foo: 'bar' } };
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
    describe("When the request doesn't have a valid email format", () => {
      const invalidInputEmail = { body: { email: 'asdhello', name: 'Jorge' } };
      it('should call util.validateRequest to make the schema validation of the request', async () => {
        const res = await request(app)
          .post(enpointRoute)
          .send(invalidInputEmail.body);
        expect(util.validateRequest.called).to.eql(true);
      });
      it('should return a 400 status code', async () => {
        const res = await request(app)
          .post(enpointRoute)
          .send(invalidInputEmail.body);
        expect(res.status).to.eql(400);
      });
    });
    describe('When the name field is not a string', () => {
      const invalidInputName = {
        body: { email: 'asdhello@asd.com', name: 123 }
      };
      it('should call util.validateRequest to make the schema validation of the request', async () => {
        const res = await request(app)
          .post(enpointRoute)
          .send(invalidInputName.body);
        expect(util.validateRequest.called).to.eql(true);
      });
      it('should return a 400 status code', async () => {
        const res = await request(app)
          .post(enpointRoute)
          .send(invalidInputName.body);
        expect(res.status).to.eql(400);
      });
    });
  });

  describe('When the request has valid input data', () => {
    const validInput = { body: { email: 'asd@asd.com', name: 'Jorge' } };

    describe('When creating the connection to mongo database', () => {
      mongoUrl = 'mongodb://mongo-instance/my_database';
      describe('When the connection is succesfull', () => {
        let userMock;
        beforeEach(() => {
          sinon.stub(mongoose, 'connect').returns({ findOne: () => {} });
          userMock = sinon
            .mock(userModel)
            .expects('create')
            .resolves({})
            .withArgs(validInput.body);
        });
        afterEach(() => {
          mongoose.connect.restore();
          userMock.restore();
        });

        it('should call the mongoose.connect and return a 200 status code', async () => {
          const res = await request(app)
            .post(enpointRoute)
            .send(validInput.body);
          expect(res.status).to.eql(200);
          expect(mongoose.connect.called).to.eql(true);
          expect(
            mongoose.connect.calledWith(mongoUrl, {
              useNewUrlParser: true
            })
          ).to.eql(true);
        });
        describe('When creating the new user is successfull', () => {
          it('should save in mongo with the specified args', async () => {
            const res = await request(app)
              .post(enpointRoute)
              .send(validInput.body);

            userMock.verify();
          });
        });

        describe('When creating the new user is NOT successfull', () => {
          it('should call return a 500 status code', async () => {
            userMock.rejects({ error: 'the error adding the user' });
            const res = await request(app)
              .post(enpointRoute)
              .send(validInput.body);

            userMock.verify();
            expect(res.status).to.eql(500);
          });
        });
      });
      describe('When the connection is not succesfull', () => {
        beforeEach(() => {
          sinon
            .stub(mongoose, 'connect')
            .rejects({ error: { message: 'the error' } });
        });
        afterEach(() => {
          mongoose.connect.restore();
        });

        it('should call the mongoose.connect and return a 500 status code', async () => {
          const res = await request(app)
            .post(enpointRoute)
            .send(validInput.body);
          expect(res.status).to.eql(500);
          expect(mongoose.connect.called).to.eql(true);
          expect(
            mongoose.connect.calledWith(mongoUrl, {
              useNewUrlParser: true
            })
          ).to.eql(true);
        });
      });
    });
  });
});
