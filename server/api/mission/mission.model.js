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
  state: {type: String, enum: 'active booked closed'.split(' ')},
  instructions: String, //html
  tasks: [TaskSchema],
  address: {
    coordinates: [Number],
    id: String
  },
  _campaign: { type: Schema.Types.ObjectId, ref: 'Campaign' }
});
MissionSchema.index({address: {coordinates: '2d'}});

module.exports = mongoose.model('Mission', MissionSchema);
