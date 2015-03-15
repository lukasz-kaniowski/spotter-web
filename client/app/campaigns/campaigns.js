'use strict';

angular.module('spotterWebApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('campaigns', {
        url: '/campaigns',
        templateUrl: 'app/campaigns/campaigns.list.html',
        controller: 'CampaignsCtrl'
      }).state('campaignsCreate', {
        url: '/campaigns/create',
        templateUrl: 'app/campaigns/campaigns.create.html',
        controller: 'CampaignsCreateCtrl'
      }).state('campaignDetails', {
        url: '/campaigns/:campaignId',
        templateUrl: 'app/campaigns/campaign.details.html',
        controller: 'CampaignDetailsCtrl'
      })
    ;
  });
