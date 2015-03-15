'use strict';

angular.module('spotterWebApp')

  .controller('CampaignLocationsCtrl', function ($scope, $http, $stateParams, $state) {

    $http.get('/api/locations/').then(function (response) {
      console.log(response);
      $scope.locations = response.data;
    });

    $http.get('/api/campaigns/'+$stateParams.campaignId).then(function (response) {
      $scope.campaign = response.data;

    });


//todo lkan; wystarczy ze te lokacje zapisz sie do misji i zrobi update, niepotrzebny jest ten caly nowy route
    $scope.save = function () {
      var body = {locations: $scope.campaign.locations};
      $http.post('/api/campaigns/'+$stateParams.campaignId +'/locations', body).then(function (response) {
        $state.go('campaignDetails', {campaignId: $scope.campaign._id});
      })
    }
  })
;
