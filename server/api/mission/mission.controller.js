'use strict';

var _ = require('lodash');
var Mission = require('./mission.model');
var Joi = require('joi');
var validations = require('./mission.validations');

function buildListQuery(params) {
  var query = _.merge({}, params);

  if(query.location){
    var locationArray = query.location.split(',').map(parseFloat);

    query['address.gps'] = {
      $near: {
        $geometry: {
          'type': 'Point',
          coordinates: locationArray
        },
        $maxDistance: 1000 * 10 //10km
      }

    };
    delete query.location;
  }
  return query;
}
// Get list of missions
exports.index = function(req, res) {
  Joi.validate(req.query, validations.listFilter, function (err, result) {
    if(err) { return handleError(res, err); }
  });

  var query = buildListQuery(req.query);

  Mission.find(query, function (err, missions) {
    if(err) { return handleError(res, err); }
    return res.json(200, missions);
  });
};

exports.listForUser = function(req, res) {
  Mission.find({_user: req.user}, function (err, missions) {
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

function mergeTasks(tasks, body) {
  if(tasks.length != body.length){
    throw new Error('Wrong number passed tasks');
  }
  tasks.forEach(function (task) {
    var taskAnswer = _.find(body, {id: task.id});
    if (!taskAnswer) {
      throw new Error('Task with given id not found');
    }
    task.data = taskAnswer.data;
  });
  return tasks;
}

exports.patchTasks = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Mission.findById(req.params.id, function (err, mission) {
    if (err) { return handleError(res, err); }
    if(!mission) { return res.send(404); }

    try{
      var tasks = mergeTasks(mission.tasks, req.body);
    } catch(e){
      return res.json(400, {error: e.message});
    }

    mission.tasks = tasks;
    mission.state = 'review';
    mission.save(function (err) {
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

exports.decline = function (req, res) {
  Mission.findById(req.params.id, function (err, mission) {
    if(err) { return handleError(res, err); }
    if(!mission) { return res.send(404); }
    mission.state = 'active';
    mission._user = undefined;
    mission.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, mission);
    })
  });
};

function handleError(res, err) {
  if(err && err.name === 'ValidationError') {
    return res.json(400, err);
  }
  return res.send(500, err);
}
