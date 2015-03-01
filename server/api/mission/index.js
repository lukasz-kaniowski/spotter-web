'use strict';

var express = require('express');
var controller = require('./mission.controller');
var auth = require('../../auth/auth.service');
var missionLocationsController = require('./locations/missions-locations.controller');

var router = express.Router();

router.use(auth.isAuthenticated());

router.get('/locations', missionLocationsController.index);
router.get('/:missionId/locations/:locationId', missionLocationsController.show);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.patch('/:id/state', controller.patchState);

module.exports = router;
