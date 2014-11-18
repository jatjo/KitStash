angular.module('app').controller('mvKitDetailCtrl', function($scope, $routeParams, $modal, mvCachedKits) {
    mvCachedKits.query().$promise.then(function(collection) {
        collection.forEach(function(kit) {
            if (kit._id === $routeParams.id) {
                $scope.kit = kit;
            }
        })
    });

    $scope.uploadImage = function() {
        $modal.open({
            templateUrl: '/partials/kits/image-upload',
            controller: 'mvImageUploadCtrl'
        });
    };
});