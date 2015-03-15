'use strict';

angular.module('spotterWebApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('campaign-missions', {
        url: 'campaigns/:campaignId/missions',
        templateUrl: 'app/campaigns/missions/missions.html',
        controller: 'MissionsCtrl'
      });
  });
