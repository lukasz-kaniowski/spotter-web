'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LocationSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  geoData: [{}],
  csv: {}
});

module.exports = mongoose.model('Location', LocationSchema);
