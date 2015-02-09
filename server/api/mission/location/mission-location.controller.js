'use strict';

var _ = require('lodash');
var Mission = require('./../mission.model.js');


// Get a single mission with all locations
exports.show = function(req, res) {
  Mission.findById(req.params.id, function (err, mission) {
    if(err) { return handleError(res, err); }
    if(!mission) { return res.send(404); }
    return res.json(mission);
  });
};

// Creates a new mission in the DB.
exports.create = function(req, res) {
  console.log('mission locations  controller', req.primaryParams.missionId, req.body.locations);
  Mission.findById(req.primaryParams.missionId, function (err, mission) {
    if(err) { return handleError(res, err); }
    if(!mission) { return res.send(404); }

    mission.locations = req.body.locations;

    mission.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, mission);
    });
  });

};


function handleError(res, err) {
  return res.send(500, err);
}
