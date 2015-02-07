'use strict';

angular.module('spotterWebApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('locations', {
        url: '/locations',
        templateUrl: 'app/locations/locations.html',
        controller: 'LocationsCtrl'
      });
  });