'use strict';

var should = require('should');
var app = require('../../../app');
var request = require('supertest');
var Mission = require('./../mission.model');
var User = require('../../user/user.model');

describe('GET /api/missions/:missionId/locations', function () {
  var token;
  before(function (done) {
    User.remove(function() {
      var user = new User({
        name: 'Fake User',
        email: 'test@test.com',
        password: 'password'
      });

      user.save(function(err) {
        if (err) return done(err);
        request(app)
          .post('/auth/local')
          .send({
            email: 'test@test.com',
            password: 'password'
          })
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            console.log('token', res.body.token);
            token = res.body.token;
            done();
          });
      });
    });

  });


  beforeEach(function (done) {
    Mission.collection.remove(done)
  });

  it('should respond with JSON array', function (done) {
    Mission.create({title: 'Some Mission'})
      .then(function (mission) {
        request(app)
          .post('/api/missions/'+mission._id + '/locations')
          .set('authorization', 'Bearer ' + token)
          .send({locations:[]})
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            if (err) return done(err);

            done();
          });


      })
  });
});
