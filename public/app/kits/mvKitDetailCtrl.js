angular.module('app').controller('mvKitDetailCtrl', function($scope, $routeParams, mvKit) {
    $scope.kit = mvKit.get({_id:$routeParams.id})
});