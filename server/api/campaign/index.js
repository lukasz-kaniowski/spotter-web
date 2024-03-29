'use strict';

var express = require('express');
var controller = require('./campaign.controller');
var missioncController = require('./missions/campaign-missions.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.use(auth.isAdmin());

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.put('/:id/action/start', controller.start);

router.get('/:id/missions', missioncController.index);

module.exports = router;
