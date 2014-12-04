angular.module('app').controller('mvKitDetailCtrl', function($log, $scope, $routeParams, $modal, mvCachedKits) {
    mvCachedKits.query().$promise.then(function(collection) {
        collection.forEach(function(kit) {
            if (kit._id === $routeParams.id) {
                $scope.kit = kit;

                // Adding images to carousel.
                addImagesToCarousel(kit.fileIds);
            }
        })
    });

    $scope.uploadImage = function() {
        var modalInstance = $modal.open({
            templateUrl: '/partials/kits/image-upload',
            controller: 'mvImageUploadCtrl'
        });

        modalInstance.result.then(
          function (uploadedImageIds) {
            // Adding new images to carousel.
            addImagesToCarousel(uploadedImageIds)
          },
          function () {
            // TODO: should uploaded images be deleted?
            $log.info('Modal dismissed at: ' + new Date());
          }
        );
    };

    var slides = $scope.slides = [];
    $scope.addSlide = function(image) {
      slides.push({
        image: image
      });
    };
});

var addImagesToCarousel = function(imageIds){
  imageIds.forEach(function(imageId) {
    mvCachedKits.image(imageId).then(function(image) {
      $scope.addSlide('data:image/png;base64,' + image);
    });
  })
};