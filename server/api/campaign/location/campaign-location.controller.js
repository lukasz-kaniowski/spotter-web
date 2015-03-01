'use strict';

var _ = require('lodash');
var Campaign = require('./../campaign.model');

exports.create = function(req, res) {
  Campaign.findById(req.primaryParams.campaignId, function (err, campaign) {
    if(err) { return handleError(res, err); }
    if(!campaign) { return res.send(404); }

    campaign.locations = req.body.locations;

    campaign.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, campaign);
    });
  });

};


function handleError(res, err) {
  return res.send(500, err);
}
