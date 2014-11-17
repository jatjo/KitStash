angular.module('app').controller('mvKitDetailCtrl', function($scope, $routeParams, mvCachedKits, FileUploader) {
    mvCachedKits.query().$promise.then(function(collection) {
        collection.forEach(function(kit) {
            if (kit._id === $routeParams.id) {
                $scope.kit = kit;
            }
        })
    });

    $scope.uploader = new FileUploader();
});