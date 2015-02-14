'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TaskSchema = new Schema({title: String, type: String, data: {}});

var MissionSchema = new Schema({
  title: String,
  company: String,
  dueDate: Date,
  startDate: Date,
  price: Number,
  state: {type: String, enum: 'new active booked closed'.split(' '), default: 'new'},
  instructions: String, //html
  tasks: [TaskSchema],
  // todo lkan; adres musi byc lista lokacji
  address: {
    coordinates: []
  },
  locations: [{type: Schema.Types.ObjectId, ref: 'Location'}]
});
MissionSchema.index({address: {coordinates: '2d'}});

module.exports = mongoose.model('Mission', MissionSchema);
