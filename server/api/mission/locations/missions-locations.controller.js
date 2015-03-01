'use strict';

var _ = require('lodash');
var Mission = require('./../mission.model.js');
var Joi = require('joi');
var validations = require('./../mission.validations.js');


function getCoordinates(location) {
  if (location.geoData && location.geoData[0]) {
    return [location.geoData[0].latitude, location.geoData[0].longitude];
  } else {
    return [];
  }
}
function formatMissionsWithLocations(missionsWithLocations) {
  var data = [];
  missionsWithLocations.forEach(function (mission) {
    mission.locations.forEach(function (location) {
      data.push(getBaseMissionInfo(mission, location));
    })
  });
  return data;
}

function getBaseMissionInfo(mission, location) {
  return {
    id: mission.id,
    tasks: mission.tasks,
    title: mission.title,
    dueDate: mission.dueDate,
    price: mission.price,
    state: mission.state,
    address: {
      coordinates: getCoordinates(location),
      id: location.id
    }
  }
}
function formatMissionDetailsInfo(mission, location) {
  return _.merge(getBaseMissionInfo(mission, location),
    {
      instructions: mission.instructions
    });
}

function findMissionLocation(missionId, locationId, cb) {
  Mission.findById(missionId).populate('locations').exec(function (err, mission) {
    if(err) { return cb(err); }
    if(!mission) { return cb() }

    var location = _.find(mission.locations, {'id': locationId});
    if(!location) { return cb()  }

    return cb(null, {mission: mission, location: location});
  });

}

exports.index = function (req, res) {
  Mission.find().populate('locations').exec(function (err, missionsWithLocations) {
    if (err) {
      return handleError(res, err);
    }

    var body = formatMissionsWithLocations(missionsWithLocations);
    return res.json(200, body);
  });
};

exports.show = function(req, res) {
  findMissionLocation(req.params.missionId, req.params.locationId, function (err, result) {
    if(err) { return handleError(res, err); }
    if(!result) { return res.send(404); }

    var body = formatMissionDetailsInfo(result.mission, result.location);
    return res.json(body);
  });
};


function handleError(res, err) {
  return res.send(500, err);
}
