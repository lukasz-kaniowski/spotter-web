'use strict';

var _ = require('lodash');
var Mission = require('./mission.model');
var Joi = require('joi');
var validations = require('./mission.validations');

// Get list of missions
exports.index = function(req, res) {
  Joi.validate(req.query, validations.listFilter, function (err, result) {
    if(err) { return handleError(res, err); }
  });
  Mission.find(req.query, function (err, missions) {
    if(err) { return handleError(res, err); }
    return res.json(200, missions);
  });
};

// Get a single mission
exports.show = function(req, res) {
  Mission.findById(req.params.id, function (err, mission) {
    if(err) { return handleError(res, err); }
    if(!mission) { return res.send(404); }
    return res.json(mission);
  });
};

// Creates a new mission in the DB.
exports.create = function(req, res) {
  Mission.create(req.body, function(err, mission) {
    if(err) { return handleError(res, err); }
    return res.json(201, mission);
  });
};

// Updates an existing mission in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Mission.findById(req.params.id, function (err, mission) {
    if (err) { return handleError(res, err); }
    if(!mission) { return res.send(404); }
    var updated = _.merge(mission, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, mission);
    });
  });
};

exports.patchState = function (req, res) {
  Joi.validate(req.body, validations.statePatch, function (err, result) {
    if(err) { return handleError(res, err); }
  });
  Mission.findById(req.params.id, function (err, mission) {
    if (err) { return handleError(res, err); }
    if(!mission) { return res.send(404); }
    var updated = _.merge(mission, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, mission);
    });
  });
};

// Deletes a mission from the DB.
exports.destroy = function(req, res) {
  Mission.findById(req.params.id, function (err, mission) {
    if(err) { return handleError(res, err); }
    if(!mission) { return res.send(404); }
    mission.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

exports.book = function (req, res) {
  Mission.findById(req.params.id, function (err, mission) {
    if(err) { return handleError(res, err); }
    if(!mission) { return res.send(404); }
    mission.state = 'booked';
    mission._user = req.user;
    mission.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, mission);
    })
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
