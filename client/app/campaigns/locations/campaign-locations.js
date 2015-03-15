'use strict';

angular.module('spotterWebApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('campaign-locations', {
        url: '/campaigns/:campaignId/locations',
        templateUrl: 'app/campaigns/locations/campaign-locations.html',
        controller: 'CampaignLocationsCtrl'
      })
    ;
  });
