'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Mission = require('./mission.model');

describe('GET /api/missions', function () {

  beforeEach(function (done) {
    Mission.collection.remove(done)
  });

  it('should respond with JSON array', function (done) {
    Mission.create({title: 'Some Mission'})
      .then(function () {
        request(app)
          .get('/api/missions')
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
