/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Mission = require('../api/mission/mission.model');
var Location = require('../api/location/location.model');
var Campaign = require('../api/campaign/campaign.model');

Mission.find({}).remove();

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});

Location.find({}).remove(function () {
  console.log('Locations removed');
});

Campaign.find({}).remove(function () {
  console.log('Campaigns removed');
  Campaign.create({
    title : 'Mission 1',
    company : 'Tesco',
    price: 10,
    instructions: 'Zeby wykonac misje musisz wykonac 5 zadan. <br/> Powodzenia!'
  });
});

