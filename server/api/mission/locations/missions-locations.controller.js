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
      data.push(
        {
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
      );
    })
  });
  return data;
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


function handleError(res, err) {
  return res.send(500, err);
}
