angular.module('app').controller('mvImageUploadCtrl', function($scope, FileUploader) {
    $scope.uploader = new FileUploader();
});