'use strict';

var express = require('express');
var auth = require('../../auth/auth.service');

var router = express.Router();

//router.use(auth.isAuthenticated());

router.get('/error/:code', function (req, res) {
  return res.json(req.params.code, {});
});


module.exports = router;
