angular.module('app').controller('mvKitListCtrl', function($scope, mvKit) {
    $scope.kits = mvKit.query();

    $scope.sortOptions = [{value:"kitName", text: "Sort by Kit Name"},
        {value: "aquiredDate", text: "Sort by Aquired Date"}];
    $scope.sortOrder = $scope.sortOptions[0].value;
});