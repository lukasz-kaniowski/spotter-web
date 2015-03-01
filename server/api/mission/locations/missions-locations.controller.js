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
      data.push(formatMissionsWithLocation(mission, location));
    })
  });
  return data;
}

function formatMissionsWithLocation(mission, location) {
  return {
    id: mission.id,
    tasks: mission.tasks,
    title: mission.title,
    dueDate: mission.dueDate,
    price: mission.price,
    address: {
      coordinates: getCoordinates(location),
      id: location.id
    }
  }
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
  Mission.findById(req.params.missionId).populate('locations').exec(function (err, mission) {
    if(err) { return handleError(res, err); }
    if(!mission) { return res.send(404); }

    var location = _.find(mission.locations, {'id': req.params.locationId});
    //console.log(location, mission, req.params)
    if(!location) { return res.send(404); }

    var body = formatMissionsWithLocation(mission, location);
    return res.json(body);
  });
};



function handleError(res, err) {
  return res.send(500, err);
}
