angular.module('app').controller('mvImageUploadCtrl', function($log, $scope, $routeParams, $modalInstance, FileUploader) {
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

    uploader.onBeforeUploadItem = function(item) {
        formData = [{
            kitId: $routeParams.id
        }];
        Array.prototype.push.apply(item.formData, formData);
    };

    var uploadedFileIds = [];

    uploader.onSuccessItem = function(fileItem, response, status, headers) {
      uploadedFileIds.push(response.fileId);
      $log.info('onSuccessItem', fileItem, response, status, headers);
    };

    $scope.done = function() {
      $modalInstance.close(uploadedFileIds);
    };

    $scope.cancel = function() {
      $modalInstance.dismiss();
    };
});