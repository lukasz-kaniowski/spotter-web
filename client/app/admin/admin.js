'use strict';

angular.module('spotterWebApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl'
      })
      .state('user-create', {
        url: '/users/create',
        templateUrl: 'app/admin/create/create.html',
        controller: 'UserCreateCtrl'
      })
    ;
  });
