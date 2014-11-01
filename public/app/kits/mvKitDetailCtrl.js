angular.module('app').controller('mvKitDetailCtrl', function($scope, $routeParams, mvCachedKits) {
    mvCachedKits.query().$promise.then(function(collection) {
        collection.forEach(function(kit) {
            if (kit._id === $routeParams.id) {
                $scope.kit = kit;
            }
        })
    })
});