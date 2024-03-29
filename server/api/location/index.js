'use strict';

var express = require('express');
var controller = require('./location.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();
router.use(auth.isAdmin());

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.post('/upload', controller.upload);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
