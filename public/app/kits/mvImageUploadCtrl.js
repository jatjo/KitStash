angular.module('app').controller('mvImageUploadCtrl', function($log, $scope, $modalInstance, FileUploader) {
    var uploader = $scope.uploader = new FileUploader({
        url: "/api/kits/uploadImage"
    });

    uploader.filters.push({
      name: 'imageFilter',
      fn: function(item /*{File|FileLikeObject}*/, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    var filesUploaded = [];

    uploader.onSuccessItem = function(fileItem, response, status, headers) {
      filesUploaded.add(fileItem);
      $log.info('onSuccessItem', fileItem, response, status, headers);
    };

    $scope.submitForm = function() {
      $log.info(filesUploaded);
      $modalInstance.close();
    };

    $scope.cancelForm = function() {
      $modalInstance.dismiss();
    };
});