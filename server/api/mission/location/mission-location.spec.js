'use strict';

var should = require('should');
var app = require('../../../app');
var request = require('supertest');
var Mission = require('./../mission.model');
var AuthHelper = require('../../../auth/auth.spec.helper');

describe('Mission Location, endpoint: `/api/missions/:missionId/locations`', function () {
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

  it('POST should add save locations for given mission', function (done) {
    Mission.create({title: 'Some Mission'})
      .then(function (mission) {
        request(app)
          .post('/api/missions/' + mission._id + '/locations')
          .set('authorization', 'Bearer ' + token)
          .send({locations: []})
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            if (err) return done(err);

            done();
          });


      })
  });
});
