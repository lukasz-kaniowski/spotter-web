'use strict';

var should = require('chai').should();
var expect = require('chai').expect;
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
    var mission1 = {
      title: 'Warszawa1',
      address: {
        gps: {
          type: 'Point',
          coordinates: [52.249126, 20.995619]
        }
      }
    };
    var mission2 = {
      title: 'Warszawa2',
      address: {
        gps: {
          type: 'Point',
          coordinates: [52.241348, 21.015532]
        }
      }
    };
    var mission3 = {
      title: 'Grojec',
      address: {
        gps: {
          type: 'Point',
          coordinates: [51.851566, 20.877516]
        }
      }
    };

    beforeEach(function (done) {
      Mission.create(mission1, mission2, mission3).then(function () {
        done();
      });
    });

    it('should return mission close to location', function (done) {
      request(app)
        .get('/api/missions?location=52.238510,21.029093')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) return done(err);
          res.body.should.be.instanceof(Array);
          res.body.length.should.be.equal(2);
          res.body[0].title.should.be.equal(mission2.title);
          res.body[1].title.should.be.equal(mission1.title);
          done();
        });
    });

    it('should filter missions by `state`', function (done) {
      Mission.create({title: 'Active', state: 'active'}, {title: 'Booked', state: 'booked'})
        .then(function (mission1, mission2) {
          request(app)
            .get('/api/missions?state=active')
            .set('authorization', 'Bearer ' + token)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
              if (err) return done(err);
              res.body.should.be.instanceof(Array);
              res.body.length.should.be.equal(1);
              res.body[0].title.should.be.equal('Active');
              done();
            });
        }).onReject(done);
    });

    ['state1', 'title', 'price'].forEach(function (param) {
      it('should return 400 if unknown parameter is passed, param=' + param, function (done) {
        request(app)
          .get('/api/missions?' + param)
          .set('authorization', 'Bearer ' + token)
          .expect(400)
          .expect('Content-Type', /json/)
          .end(done);
      });

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

  describe('Decline a mission: DELETE /api/missions/:missionId/book', function () {
    var mission;

    beforeEach(function (done) {
      Mission.create({
        title: 'Some Mission',
        instructions: 'some instructions',
        state: 'booked',
        _user: user
      }).then(function (result) {
        mission = result;
        done()
      }).onReject(done);
    });

    it('should change a state of `booked` mission to `active`', function (done) {
      request(app)
        .delete('/api/missions/' + mission.id + '/book')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) return done(err);
          res.body.state.should.be.equal('active');
          done();
        });
    });

    it('should unassign user', function (done) {
      request(app)
        .delete('/api/missions/' + mission.id + '/book')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) return done(err);
          Mission.findById(mission.id).exec().then(function (mission) {
            expect(mission._user).to.be.equal(undefined);
            done();
          }).onReject(done);

        });

    });
  });

  describe('Missions assign to user: GET /api/missions/me', function () {

    it('should return all of the missions assign to user', function (done) {
      Mission.create(
        {title: 'Active', state: 'active', _user: user},
        {title: 'Booked', state: 'booked', _user: user},
        {title: 'Active not assigned', state: 'active'}
      ).then(function (mission1, mission2, mission3) {
          request(app)
            .get('/api/missions/me')
            .set('authorization', 'Bearer ' + token)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
              if (err) return done(err);
              res.body.should.be.instanceof(Array);
              res.body.length.should.be.equal(2);
              res.body[0].title.should.be.equal(mission1.title);
              res.body[1].title.should.be.equal(mission2.title);
              done();
            });
        });
    });
  });

  describe('Sending Task Answers: PATCH /api/missions/:missionId/tasks', function () {

    var mission1;

    beforeEach(function (done) {
      Mission.create(
        {title: 'Mission1', tasks: [{type: 'text', title: 'SomeText'}, {type: 'text', title: 'SomeText'}]}
      ).then(function (mission) {
          mission1 = mission;
          done();
        }).onReject(done)
    });

    it('should store answers against tasks', function (done) {
      request(app)
        .patch('/api/missions/' + mission1._id + '/tasks')
        .set('authorization', 'Bearer ' + token)
        .send([
          {
            "data": {
              "answer": "Some answer from the user"
            },
            "id": mission1.tasks[0]._id
          },
          {
            "data": {
              "answer": "Answer for the second question"
            },
            "id": mission1.tasks[1]._id
          }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) return done(err);

          res.body.tasks[0].data.answer.should.be.equal('Some answer from the user');
          res.body.tasks[1].data.answer.should.be.equal('Answer for the second question');
          res.body.state.should.equal('review');
          done();
        });
    });

    [
      {
        name: 'should return 400 if send to many tasks',
        body: [{}, {}, {}]
      },
      {
        name: 'should return 400 if send to little tasks',
        body: [{}]
      },
      {
        name: 'should return 400 if task with id not found',
        body: [{"id": 'wrong_id'},{}]
      }

    ].forEach(function (s) {
        it(s.name, function (done) {
          request(app)
            .patch('/api/missions/' + mission1._id + '/tasks')
            .set('authorization', 'Bearer ' + token)
            .send(s.body)
            .expect(400)
            .expect('Content-Type', /json/)
            .end(done);
        });
      });

  });




});
