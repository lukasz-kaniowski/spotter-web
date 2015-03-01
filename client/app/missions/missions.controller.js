'use strict';

angular.module('spotterWebApp')
  .controller('MissionsCtrl', function ($scope, $http) {

    $http.get('/api/campaigns').then(function (response) {
      console.log(response);
      $scope.missions = response.data;
    });
  })
  .controller('MissionsCreateCtrl', function ($scope, $http, $state, taskModal) {

    $scope.newMission = {
      tasks: []
    };

    $scope.create = function () {
      $http.post('/api/campaigns', $scope.newMission).then(function () {
        $state.go('missions');
      });
    };

    $scope.addTask = function () {
      taskModal.open().result.then(function (task) {
        $scope.newMission.tasks.push(task);
      });
    };
  })
  .controller('MissionDetailsCtrl', function ($scope, $http, $stateParams, $state) {

    $http.get('/api/campaigns/' + $stateParams.missionId).then(function (response) {
      console.log(response);
      $scope.mission = response.data;
    });

    $scope.start = function () {
      $http.put('/api/campaigns/' + $stateParams.missionId + '/action/start').then(function (response) {
        $scope.mission = response.data;
      })
    };

    $scope.delete = function () {
      $http.delete('/api/campaigns/' + $stateParams.missionId).then(function () {
        $state.go('missions');
      })
    };
  })
;
