'use strict';

var should = require('should');
var app = require('../../../app');
var request = require('supertest');
var Campaign = require('../campaign.model');
var AuthHelper = require('../../../auth/auth.spec.helper.js');

describe('Campaign Locations', function () {
  var token;

  before(function (done) {
    AuthHelper.initUser(function (user, tokenRes) {
      token = tokenRes;
      done();
    });
  });


  beforeEach(function (done) {
    Campaign.collection.remove(done)
  });

  describe('Add location to campaign: POST /api/campaigns/:campaignId/locations', function () {

    it('POST should add save locations for given mission', function (done) {
      Campaign.create({title: 'Some Campaign'})
        .then(function (campaign) {
          request(app)
            .post('/api/campaigns/' + campaign.id + '/locations')
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

});
