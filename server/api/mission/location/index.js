'use strict';

var express = require('express');
var controller = require('./mission-location.controller');
var auth = require('../../../auth/auth.service');

var router = express.Router();

router.use(auth.isAuthenticated());


router.post('/', controller.create);

module.exports = router;
