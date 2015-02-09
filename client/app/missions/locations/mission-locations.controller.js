'use strict';

angular.module('spotterWebApp')

  .controller('MissionLocationsCtrl', function ($scope, $http, $stateParams) {

    $http.get('/api/locations/').then(function (response) {
      console.log(response);
      $scope.locations = response.data;
    });

    $http.get('/api/missions/'+$stateParams.missionId).then(function (response) {
      $scope.mission = response.data;

    });


//todo lkan; wystarczy ze te lokacje zapisz sie do misji i zrobi update, niepotrzebny jest ten caly nowy route
    $scope.save = function () {
      var body = {locations: $scope.mission.locations};
      $http.post('/api/missions/'+$stateParams.missionId +'/locations', body).then(function (response) {
        console.log(response);
      })
    }
  })
;
