'use strict';

angular.module('spotterWebApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('missions', {
        url: '/missions',
        templateUrl: 'app/missions/missions.html',
        controller: 'MissionsCtrl'
      }).state('missionsCreate', {
        url: '/missions/create',
        templateUrl: 'app/missions/missions.create.html',
        controller: 'MissionsCreateCtrl'
      })
    ;
  });
