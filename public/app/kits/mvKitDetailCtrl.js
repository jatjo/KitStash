angular.module('app').controller('mvKitDetailCtrl', function($log, $scope, $routeParams, $modal, mvCachedKits) {
    mvCachedKits.query().$promise.then(function(collection) {
        collection.forEach(function(kit) {
            if (kit._id === $routeParams.id) {
                $scope.kit = kit;

                kit.fileIds.forEach(function(imageId) {
                  mvCachedKits.image(imageId).then(function(image) {
                    $scope.addSlide('data:image/png;base64,' + image);
//                    images.push('data:image/png;base64,' + image);
                  });
                })
            }
        })
    });

    $scope.uploadImage = function() {
        var modalInstance = $modal.open({
            templateUrl: '/partials/kits/image-upload',
            controller: 'mvImageUploadCtrl'
        });

        modalInstance.result.then(
          function (uploadedFileIds) {
            $log.info('Modal closed at: ' + new Date());
            $log.info('Returned fileids: ' + uploadedFileIds);

            // Adding new images to carousel.
            uploadedFileIds.forEach(function(imageId) {
              mvCachedKits.image(imageId).then(function(image) {
                $scope.addSlide('data:image/png;base64,' + image);
              });
            })
          },
          function () {
            // TODO: should uploaded images be deleted?
            $log.info('Modal dismissed at: ' + new Date());
          }
        );
    };

//    var images = $scope.images = [];
    var slides = $scope.slides = [];
    $scope.addSlide = function(image) {
      slides.push({
        image: image
      });
    };
});

