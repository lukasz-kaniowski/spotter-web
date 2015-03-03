'use strict';

var should = require('chai').should();
var app = require('../../app');
var request = require('supertest');
var AuthHelper = require('../../auth/auth.spec.helper');

describe('GET /api/locations', function () {
  var token;

  before(function (done) {
    AuthHelper.initUser(function (user, tokenRes) {
      token = tokenRes;
      done();
    });
  });

  it('should respond with JSON array', function (done) {
    request(app)
      .get('/api/locations')
      .set('authorization', 'Bearer ' + token)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});
