angular.module('app').controller('mvMainCtrl', function($scope, mvKit) {
    $scope.kits = mvKit.query();
});
