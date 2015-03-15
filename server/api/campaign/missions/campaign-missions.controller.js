'use strict';

var _ = require('lodash');
var Mission = require('../../mission/mission.model');

exports.index = function(req, res) {
  Mission.find({_campaign: req.params.id},function (err, missions) {
    if(err) { return handleError(res, err); }
    return res.json(200, missions);
  });
};



function handleError(res, err) {
  console.log(err);
  return res.send(500, err);
}
