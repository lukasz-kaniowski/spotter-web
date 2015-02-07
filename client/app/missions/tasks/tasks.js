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
    $scope.items = ['A', 'B'];

    $scope.ok = function () {
      $modalInstance.close({type: 'text', title: 'nowe zadanie'});
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  });
