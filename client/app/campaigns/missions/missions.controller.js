'use strict';

angular.module('spotterWebApp')
  .controller('MissionsCtrl', function ($scope, $stateParams, $http) {
    $http.get('/api/campaigns/' + $stateParams.campaignId + '/missions').then(function (response) {
      console.log(response);
      $scope.missions = response.data;
    });
  });
