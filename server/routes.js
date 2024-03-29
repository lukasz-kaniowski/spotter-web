/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  var passPrimaryParams = function(req, res, next) {
    req.primaryParams = req.params;
    next();
  };


  // Insert routes below
  app.use('/api/campaigns/:campaignId/locations', passPrimaryParams);
  app.use('/api/campaigns/:campaignId/locations', require('./api/campaign/location'));
  app.use('/api/campaigns', require('./api/campaign'));
  app.use('/api/locations', require('./api/location'));
  app.use('/api/missions', require('./api/mission'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/test', require('./api/test'));

  app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
