'use strict';

angular.module('spotterWebApp')
  .controller('LocationsCtrl', function ($scope, $upload, $http) {

    function refreshLocations() {
      $http.get('/api/locations').then(function (response) {
        $scope.locations = response.data;
      });
    }

    refreshLocations();

    //
    //$scope.$watch('files', function () {
    //  console.log('------- files');
    //  $scope.upload($scope.files);
    //});


    $scope.upload = function (files) {
      if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          $upload.upload({
            url: '/api/locations/upload',
            fields: {'username': 'some user'},
            file: file
          }).progress(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
          }).success(function (data, status, headers, config) {
            console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
            setTimeout(refreshLocations, 300);
          });
        }
      }
    };
  });
