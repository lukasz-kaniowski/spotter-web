'use strict';

var express = require('express');
var controller = require('./mission.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.use(auth.isAuthenticated());

router.put('/:id/book', controller.book);
router.delete('/:id/book', controller.decline);
router.get('/me', controller.listForUser);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

router.patch('/:id/state', controller.patchState);


module.exports = router;
