'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var MissionSchema = new Schema({
  title: String,
  company: String,
  dueDate: Date,
  price: Number,
  status: String, //moze enum
  instructions: String, //html

  // todo lkan; adres musi byc lista lokacji
  tasks: [],
  address: {
    coordinates: []
  }
});
MissionSchema.index({address: {coordinates: '2d'}});

module.exports = mongoose.model('Mission', MissionSchema);
