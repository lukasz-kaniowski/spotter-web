'use strict';

angular.module('spotterWebApp')
  .factory('taskModal', function ($modal) {
    var modalOptions = {
      controller: 'TasksCreateCtrl',
      controllerAs: 'tasksCreateCtrl',
      templateUrl: 'app/missions/tasks/tasks.create.html'
    };

    return {
      open: function () {
        return $modal.open(modalOptions);
      }
    };
  })
  .controller('TasksCreateCtrl', function ($scope, $modalInstance) {
    $scope.types = [
      {label: 'Pytanie z odpowiedzia', value: 'text'},
      {label: 'Pytanie Tak/Nie', value: 'yes/no'}
    ];

    $scope.task = {};

    $scope.ok = function () {
      $modalInstance.close($scope.task);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  });
