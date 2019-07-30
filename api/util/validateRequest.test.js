const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const util = require('./index');
const joi = require('joi');

describe('When validating a request object', () => {
    describe('When the schema is not an object', () => {
        it('Should return an error object, if the request is Undefined', () => {
            const result = util.validateRequest({}, undefined);
            expect(result).to.be.a('null');
        });
        it('Should return null, if the request is Null', () => {
            const result = util.validateRequest({}, null);
            expect(result).to.be.a('null');
        });
        it('Should return an error object, if the request is a number', () => {
            const result = util.validateRequest({}, 123123);
            expect(result).to.be.a('object');
        });
    });
    describe('When the schema is an object', () => {
        const validRequestObjects = [
            'body',
            'cookies',
            'headers',
            'params',
            'query',
        ];
        it('should return null, if the schema has no keys', () => {
            const result = util.validateRequest({}, {});
            expect(result).to.be.a('null');
        });
        it('should return null, if the schema has no valid request object', () => {
            const result = util.validateRequest({}, { asd: 'qweq' });
            expect(result).to.be.a('null');
        });
        describe('When the schema has at least one valid request object', () => {
            describe('When the schema has the body object', () => {
                it('should validate, the request object matches the schema', () => {
                    const result = util.validateRequest({ body: { foo: 123 } }, { body: { foo: joi.number().required() } });
                    expect(result).to.be.a('null');
                });
                it('should validate returning the error since, the request object missmatches the schema', () => {
                    const result = util.validateRequest({ body: 'qweq' }, { body: { foo: joi.number().required() } });
                    expect(result).to.be.a('object');
                });
            });
            describe('When the schema has the cookies object', () => {
                it('should validate, the request object matches the schema', () => {
                    const result = util.validateRequest({ cookies: { foo: 'qwerty' } }, { cookies: { foo: joi.string().required() } });
                    expect(result).to.be.a('null');
                });
                it('should validate returning the error since, the request object missmatches the schema', () => {
                    const result = util.validateRequest({ cookies: 'qweq' }, { cookies: { foo: joi.string().required() } });
                    expect(result).to.be.a('object');
                });
            });
            describe('When the schema has the headers object', () => {
                it('should validate, the request object matches the schema', () => {
                    const result = util.validateRequest({ headers: { foo: 'qwerty' } }, { headers: { foo: joi.string().required() } });
                    expect(result).to.be.a('null');
                });
                it('should validate returning the error since, the request object missmatches the schema', () => {
                    const result = util.validateRequest({ headers: 'qweq' }, { headers: { foo: joi.string().required() } });
                    expect(result).to.be.a('object');
                });
            });
            describe('When the schema has the params object', () => {
                it('should validate, the request object matches the schema', () => {
                    const result = util.validateRequest({ params: { foo: 'qwerty' } }, { params: { foo: joi.string().required() } });
                    expect(result).to.be.a('null');
                });
                it('should validate returning the error since, the request object missmatches the schema', () => {
                    const result = util.validateRequest({ params: 'qweq' }, { params: { foo: joi.string().required() } });
                    expect(result).to.be.a('object');
                });
            });
            describe('When the schema has the query object', () => {
                it('should validate, the request object matches the schema', () => {
                    const result = util.validateRequest({ query: { foo: 'qwerty' } }, { query: { foo: joi.string().required() } });
                    expect(result).to.be.a('null');
                });
                it('should validate returning the error since, the request object missmatches the schema', () => {
                    const result = util.validateRequest({ query: 'qweq' }, { query: { foo: joi.string().required() } });
                    expect(result).to.be.a('object');
                });
            });
        });
    });
});