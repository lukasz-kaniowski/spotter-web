'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAdmin(), controller.index);
router.delete('/:id', auth.isAdmin(), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.put('/:id/role', auth.isAdmin(), controller.changeRole);
router.get('/:id', auth.isAdmin(), controller.show);
router.post('/', auth.isAdmin(), controller.create);

module.exports = router;
