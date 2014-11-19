angular.module('app').controller('mvImageUploadCtrl', function($log, $scope, $modalInstance, FileUploader) {
    var uploader = $scope.uploader = new FileUploader();

    uploader.filters.push({
      name: 'imageFilter',
      fn: function(item /*{File|FileLikeObject}*/, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    uploader.onCompleteItem = function(fileItem, response, status, headers) {
      $scope.slides.push({
        image: fileItem,
        text: 'Some text'
      });
      $log.info('onCompleteItem', fileItem, response, status, headers);
    };

    $scope.submitForm = function() {
      $modalInstance.close();
    };

    $scope.cancelForm = function() {
      $modalInstance.dismiss();
    };
});