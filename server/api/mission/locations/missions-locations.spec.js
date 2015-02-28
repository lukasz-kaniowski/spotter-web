'use strict';

var should = require('should');
var app = require('../../../app');
var request = require('supertest');
var Mission = require('../mission.model');
var Location = require('../../location/location.model');
var AuthHelper = require('../../../auth/auth.spec.helper');

describe('GET /api/missions/locations', function () {
  var token;
  var locations;

  before(function (done) {
    AuthHelper.initUser(function (user, tokenRes) {
      token = tokenRes;
      Location.create({name: 'location1'}, {
        name: 'location2',
        geoData: [{"longitude": 20.71639, "latitude": 49.596436}]
      })
        .then(function (loc1, loc2) {
          locations = [loc1, loc2];
          done();
        }, done);

    });
  });

  after(function (done) {
    Location.collection.remove(done);
  });

  beforeEach(function (done) {
    Mission.collection.remove(done);
  });

  it('should respond with empty array if no locations for mission', function (done) {
    Mission.create({title: 'Some Mission'})
      .then(function () {
        request(app)
          .get('/api/missions/locations')
          .set('authorization', 'Bearer ' + token)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            if (err) return done(err);
            res.body.should.be.instanceof(Array);
            res.body.length.should.be.equal(0);
            done();
          });

      })
  });

  it('should respond with mission locations for single mission', function (done) {
    Mission.create({
      title: 'Some Mission',
      dueDate: new Date('2015-02-21T16:33:21.000Z'),
      price: 12,
      locations: locations
    })
      .then(function (mission) {
        request(app)
          .get('/api/missions/locations')
          .set('authorization', 'Bearer ' + token)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            if (err) return done(err);
            res.body.should.be.instanceof(Array);
            res.body.length.should.be.equal(2);
            res.body[0].title.should.be.equal('Some Mission');
            res.body[1].should.be.eql({
              "id": mission.id,
              "title": mission.title,
              "address": {
                "coordinates": [
                  locations[1].geoData[0].latitude,
                  locations[1].geoData[0].longitude
                ],
                "id": locations[1].id
              },
              "dueDate": '2015-02-21T16:33:21.000Z',
              "tasks": [],
              "price": mission.price
            });
            done();
          });

      })
  });


  it('should respond with mission locations for multiple mission', function (done) {
    Mission.create({title: 'Some Mission', locations: locations}, {title: 'Mission 2', locations: [locations[1]]})
      .then(function (mission1, mission2) {
        request(app)
          .get('/api/missions/locations')
          .set('authorization', 'Bearer ' + token)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            if (err) return done(err);
            res.body.should.be.instanceof(Array);
            res.body.length.should.be.equal(3);
            res.body[0].title.should.be.equal(mission1.title);
            res.body[0].address.coordinates.should.be.eql([]);

            res.body[1].title.should.be.equal(mission1.title);

            res.body[2].title.should.be.equal(mission2.title);
            res.body[2].address.coordinates.should.be.eql([
              locations[1].geoData[0].latitude,
              locations[1].geoData[0].longitude
            ]);

            done();
          });

      })
  });
});
