'use strict';

angular.module('spotterWebApp')
  .controller('MissionsCtrl', function ($scope, $http) {

    $http.get('/api/missions').then(function (response) {
      console.log(response);
      $scope.missions = response.data;
    });
  })
  .controller('MissionsCreateCtrl', function ($scope, $http, $state) {

    $scope.newMission = {};

    $scope.create = function () {
      $http.post('/api/missions', $scope.newMission).then(function () {
        $state.go('missions');
      });
    }
  })
  .controller('MissionDetailsCtrl', function ($scope, $http, $stateParams) {

    $http.get('/api/missions/' +$stateParams.missionId).then(function (response) {
      console.log(response);
      $scope.mission = response.data;
    });
  })
;
