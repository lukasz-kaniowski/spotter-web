'use strict';

angular.module('spotterWebApp')
  .config(function ($urlRouterProvider) {
    //$stateProvider
    //  .state('main', {
    //    url: '/',
    //    templateUrl: 'app/main/main.html',
    //    controller: 'MainCtrl'
    //  });
    $urlRouterProvider.when('/','/campaigns');
  });
