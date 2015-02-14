var Joi = require('joi');

exports.statePatch = Joi.object().keys({
  state: Joi.string().required()
});

exports.listFilter = Joi.object().keys({
  state: Joi.string().optional()
});
