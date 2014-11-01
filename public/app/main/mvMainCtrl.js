angular.module('app').controller('mvMainCtrl', function($scope, mvCachedKits) {
    $scope.kits = mvCachedKits.query();
});
