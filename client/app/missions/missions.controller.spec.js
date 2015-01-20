'use strict';

describe('Controller: MissionsCtrl', function () {

  // load the controller's module
  beforeEach(module('spotterWebApp'));

  var MissionsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MissionsCtrl = $controller('MissionsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
