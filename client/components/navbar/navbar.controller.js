'use strict';

angular.module('spotterWebApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [
      {
        title: 'Kampanie',
        link: '/campaigns',
        show: Auth.isAdmin
      },
      {
        title: 'Lokacje',
        link: '/locations',
        show: Auth.isAdmin
      }
    ];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function () {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function (route) {
      return startsWith($location.path(), route);
    };

    function startsWith(text, textWith){
      return text.indexOf(textWith) === 0;
    }
  });
