var Mission = require('./mission.model');

function getCoordinates(location) {
  if (location.geoData && location.geoData[0]) {
    return [location.geoData[0].latitude, location.geoData[0].longitude];
  } else {
    return [];
  }
}

function formatMissionDetailsInfo(campaign, location) {

  return {
    id: campaign.id,
    instructions: campaign.instructions,
    tasks: campaign.tasks,
    title: campaign.title,
    dueDate: campaign.dueDate,
    price: campaign.price,
    state: 'active',
    _campaign: campaign,
    address: {
      gps: {
        coordinates: getCoordinates(location)
      },
      id: location.id
    }
  };
}


exports.createMissions = function (campaign) {
  var missions = campaign.locations.map(function (location) {
    return formatMissionDetailsInfo(campaign, location);
  });
  return Mission.create(missions);
};
