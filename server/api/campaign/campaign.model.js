'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TaskSchema = new Schema({title: String, type: String, data: {}});

var CampaignSchema = new Schema({
  title: String,
  company: String,
  dueDate: Date,
  startDate: Date,
  price: Number,
  state: {type: String, enum: 'new active booked closed'.split(' '), default: 'new'},
  instructions: String, //html
  tasks: [TaskSchema],
  locations: [{type: Schema.Types.ObjectId, ref: 'Location'}]
});

module.exports = mongoose.model('Campaign', CampaignSchema);
