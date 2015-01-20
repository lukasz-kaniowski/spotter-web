'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var MissionSchema = new Schema({
  title: String,
  company: String,
  address: {
    coordinates: []
  }
});
MissionSchema.index({address: {coordinates: '2d'}});

module.exports = mongoose.model('Mission', MissionSchema);
