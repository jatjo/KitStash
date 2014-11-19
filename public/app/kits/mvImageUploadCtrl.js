angular.module('app').controller('mvImageUploadCtrl', function($scope, $modalInstance, FileUploader) {
    $scope.uploader = new FileUploader();

    $scope.submitForm = function() {
      $modalInstance.close();
    };

    $scope.cancelForm = function() {
      $modalInstance.dismiss();
    };
});