'use strict';

angular.module('spotterWebApp')
  .controller('UserCreateCtrl', function ($scope, User, $location, $window) {
    $scope.user = {
      role: 'user'
    };
    $scope.errors = {};
    $scope.roles = [
      {value: 'user', label: 'Uzytkownik'},
      {value: 'admin', label: 'Administrator'}
    ];

    $scope.save = function (form) {
      $scope.submitted = true;

      if (form.$valid) {

        User.save({
            name: $scope.user.name,
            email: $scope.user.email,
            password: $scope.user.password,
            role: $scope.user.role
          },
          function (data) {
            $location.path('/admin');

          },
          function (err) {
            err = err.data;
            $scope.errors = {};

            // Update validity of form fields that match the mongoose errors
            angular.forEach(err.errors, function (error, field) {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.message;
            });

          });
      }
    };

  });
