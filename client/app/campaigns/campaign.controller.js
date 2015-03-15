'use strict';

angular.module('spotterWebApp')
  .controller('CampaignsCtrl', function ($scope, $http) {

    $http.get('/api/campaigns').then(function (response) {
      console.log(response);
      $scope.campaigns = response.data;
    });
  })
  .controller('CampaignsCreateCtrl', function ($scope, $http, $state, taskModal) {

    $scope.newCampaign = {
      tasks: []
    };

    $scope.create = function () {
      $http.post('/api/campaigns', $scope.newCampaign).then(function () {
        $state.go('campaigns');
      });
    };

    $scope.addTask = function () {
      taskModal.open().result.then(function (task) {
        $scope.newCampaign.tasks.push(task);
      });
    };
  })
  .controller('CampaignDetailsCtrl', function ($scope, $http, $stateParams, $state) {

    $http.get('/api/campaigns/' + $stateParams.campaignId).then(function (response) {
      console.log(response);
      $scope.campaign = response.data;
    });

    $scope.start = function () {
      $http.put('/api/campaigns/' + $stateParams.campaignId + '/action/start').then(function (response) {
        $scope.campaign = response.data;
      })
    };

    $scope.delete = function () {
      $http.delete('/api/campaigns/' + $stateParams.campaignId).then(function () {
        $state.go('campaigns');
      })
    };
  })
;
