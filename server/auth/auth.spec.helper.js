var User = require('../api/user/user.model');
var app = require('../app');
var request = require('supertest');


exports.initUser = function (cb) {
  User.remove(function () {
    var admin = new User({
      name: 'Fake User',
      email: 'test@test.com',
      password: 'password',
      role: 'admin'
    });

    admin.save(function (err, user) {
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
          cb(user, res.body.token);
        });
    });
  });

};
