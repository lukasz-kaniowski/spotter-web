'use strict';

var express = require('express');
var controller = require('./campaign-location.controller.js');
var auth = require('../../../auth/auth.service.js');

var router = express.Router();

router.use(auth.isAuthenticated());

router.post('/', controller.create);

module.exports = router;
