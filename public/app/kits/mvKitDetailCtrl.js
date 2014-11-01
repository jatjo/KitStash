angular.module('app').controller('mvKitDetailCtrl', function($scope, $routeParam, mvKit) {
    $scope.kit = mvKit.get({_id:$routeParams.id})
});