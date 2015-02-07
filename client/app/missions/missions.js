'use strict';

angular.module('spotterWebApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('missions', {
        url: '/missions',
        templateUrl: 'app/missions/missions.list.html',
        controller: 'MissionsCtrl'
      }).state('missionsCreate', {
        url: '/missions/create',
        templateUrl: 'app/missions/missions.create.html',
        controller: 'MissionsCreateCtrl'
      }).state('missionDetails', {
        url: '/missions/:missionId',
        templateUrl: 'app/missions/mission.details.html',
        controller: 'MissionDetailsCtrl'
      })
    ;
  });
