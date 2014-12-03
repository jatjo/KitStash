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

    uploader.onSuccessItem = function(fileItem, response, status, headers) {
      $log.info('onSuccessItem', fileItem, response, status, headers);
    };

    $scope.done = function() {
      $modalInstance.close();
      // TODO: Somehow make carousel reload images from database
    };

    $scope.cancel = function() {
      $modalInstance.dismiss();
      // TODO: should uploaded images be deleted?
    };
});