'use strict';

var should = require('chai').should();
var app = require('../../app');
var request = require('supertest');
var Mission = require('./mission.model');
var AuthHelper = require('../../auth/auth.spec.helper');

describe('GET /api/missions', function () {
  var token;

  before(function (done) {
    AuthHelper.initUser(function (user, tokenRes) {
      token = tokenRes;
      done();
    });
  });

  beforeEach(function (done) {
    Mission.collection.remove(done)
  });

  it('should respond with JSON array', function (done) {
    Mission.create({title: 'Some Mission'})
      .then(function () {
        request(app)
          .get('/api/missions')
          .set('authorization', 'Bearer ' + token)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            if (err) return done(err);
            res.body.should.be.instanceof(Array);
            res.body.length.should.be.equal(1);
            res.body[0].title.should.be.equal('Some Mission');
            done();
          });

      })
  });
});
