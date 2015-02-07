'use strict';

angular.module('spotterWebApp')
  .controller('MissionsCtrl', function ($scope, $http) {

    $http.get('/api/missions').then(function (response) {
      console.log(response);
      $scope.missions = response.data;
    });
  })
  .controller('MissionsCreateCtrl', function ($scope, $http, $state, taskModal) {

    $scope.newMission = {
      tasks: []
    };

    $scope.create = function () {
      $http.post('/api/missions', $scope.newMission).then(function () {
        $state.go('missions');
      });
    };

    $scope.addTask = function () {
      taskModal.open().result.then(function (task) {
        $scope.newMission.tasks.push(task);
      });
    };
  })
  .controller('MissionDetailsCtrl', function ($scope, $http, $stateParams) {

    $http.get('/api/missions/' + $stateParams.missionId).then(function (response) {
      console.log(response);
      $scope.mission = response.data;
    });
  })
;
