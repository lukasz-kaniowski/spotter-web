process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('../server/config/environment');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);


var User =  require('../server/api/user/user.model');

exports.up = function (next) {
  User.create({
    provider: 'local',
    name: 'Lukasz K',
    email: 'ukache@gmail.com',
    password: 'test123',
    role: 'admin'
  }, function (err, result) {
    next(err);
  });

};

exports.down = function (next) {
  User.remove({email: 'ukache@gmail.com'}, next);
};
