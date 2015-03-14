'use strict';

var should = require('chai').should();
var app = require('../../app');
var request = require('supertest');
var AuthHelper = require('../../auth/auth.spec.helper');
var User = require('./user.model');

describe('Campaigns', function () {
  var token, user;

  before(function (done) {
    AuthHelper.initUser(function (usr, tokenRes) {
      token = tokenRes;
      User.create({
        name: 'User2',
        email: 'user@test.com',
        password: 'password'
      }).then(function (created) {
        user = created;
        done()
      }, done);
    });
  });


  describe('User: PUT /api/user/:id/role', function () {

    it('should update role', function (done) {
      request(app)
        .put('/api/users/' + user.id + '/role')
        .set('authorization', 'Bearer ' + token)
        .send({role: 'admin'})
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) return done(err);
          console.log(res.body)
          res.body.role.should.be.equal('admin');
          done();
        });
    });
  });

});

