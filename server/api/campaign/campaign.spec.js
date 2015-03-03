'use strict';

var should = require('chai').should();
var app = require('../../app');
var request = require('supertest');
var AuthHelper = require('../../auth/auth.spec.helper');
var Campaign = require('./campaign.model');
var Location = require('../location/location.model');
var Mission = require('../mission/mission.model');

describe('Campaigns', function () {
  var token, locations;
  var longitude = 20.71639;
  var latitude = 49.596436;

  before(function (done) {
    AuthHelper.initUser(function (user, tokenRes) {
      token = tokenRes;
      Location.collection.remove(function () {

        Location.create({name: 'location1'}, {
          name: 'location2',
          geoData: [{"longitude": longitude, "latitude": latitude}]
        })
          .then(function (loc1, loc2) {
            locations = [loc1, loc2];
            done();
          }, done);
      });
    });
  });

  beforeEach(function (done) {
    Campaign.collection.remove(function () {
      Mission.collection.remove(done);
    });
  });

  describe('List: GET /api/campaigns', function () {

    it('should respond with JSON array', function (done) {
      request(app)
        .get('/api/campaigns')
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

  describe('Start: PUT /api/campaigns/:id/action/start', function () {

    it('should create missions for each of the location', function (done) {
      Campaign.create({title: 'Some campaign', locations: locations}).then(function (campaign) {
        request(app)
          .put('/api/campaigns/' + campaign.id + '/action/start')
          .set('authorization', 'Bearer ' + token)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            if (err) return done(err);
            res.body.state.should.be.equal('active');

            Mission.find({}).exec(function (err, missions) {
              missions.length.should.be.equal(2);
              missions[1].should.have.property('title', campaign.title);

              // todo lkan; fix below, probably objectId
              //missions[1].should.have.property('address', { coordinates: [latitude, longitude], id: locations[1].id});
              missions[1].should.have.property('state', 'active');
            });

            done();
          });

      });
    });
  });

});

