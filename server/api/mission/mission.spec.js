'use strict';

var should = require('chai').should();
var app = require('../../app');
var request = require('supertest');
var Mission = require('./mission.model');
var AuthHelper = require('../../auth/auth.spec.helper');

describe('Missions Api', function () {
  var token;
  var user;

  before(function (done) {
    AuthHelper.initUser(function (userRes, tokenRes) {
      user = userRes;
      token = tokenRes;
      done();
    });
  });

  beforeEach(function (done) {
    Mission.collection.remove(done)
  });

  describe('GET /api/missions', function () {
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

  describe('Booking a mission: PUT /api/missions/:missionId/book', function () {
    var mission;

    beforeEach(function (done) {
      Mission.create({
        title: 'Some Mission',
        instructions: 'some instructions',
        state: 'active'
      }).then(function (result) {
        mission = result;
        done()
      }).onReject(done);
    });

    it('should change a state of active mission to `booked`', function (done) {
      request(app)
        .put('/api/missions/' + mission.id + '/book')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) return done(err);
          res.body.state.should.be.equal('booked');
          done();
        });
    });

    it('should assign user', function (done) {
      request(app)
        .put('/api/missions/' + mission.id + '/book')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) return done(err);
          Mission.findById(mission.id).exec().then(function (mission) {
            mission._user.toString().should.be.equal(user.id);
            done();
          }).onReject(done);

        });

    });
  });

});
