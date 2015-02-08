'use strict';

angular.module('spotterWebApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('mission-locations', {
        url: '/missions/:missionId/locations',
        templateUrl: 'app/missions/locations/mission-locations.html',
        controller: 'MissionLocationsCtrl'
      })
    ;
  });
