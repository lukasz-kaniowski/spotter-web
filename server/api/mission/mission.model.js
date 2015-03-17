'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TaskSchema = new Schema({title: String, type: String, data: {}});

var GeoJsonPoint = {
  'type': {type: String, default: "Point"},
  coordinates: [
    {type: "Number"}
  ]
};

var MissionSchema = new Schema({
  title: String,
  company: String,
  dueDate: Date,
  startDate: Date,
  price: Number,
  state: {type: String, enum: 'active review booked closed'.split(' ')},
  instructions: String, //html
  tasks: [TaskSchema],
  address: {
    gps: GeoJsonPoint,
    _location: {type: Schema.Types.ObjectId, ref: 'Location'}
  },
  _campaign: {type: Schema.Types.ObjectId, ref: 'Campaign'},
  _user: {type: Schema.Types.ObjectId, ref: 'User'}
});

MissionSchema.index({'address.gps': '2dsphere'});

MissionSchema.pre('save', function (next) {
  if (this.isNew && Array.isArray(this.address.gps.coordinates) && 0 === this.address.gps.coordinates.length) {
    this.address.gps = undefined;
  }
  next();
});

module.exports = mongoose.model('Mission', MissionSchema);
