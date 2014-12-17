angular.module('app').controller('mvKitDetailCtrl', function($log, $scope, $routeParams, $modal, mvCachedKits) {
    $scope.carouselInterval = 2000;
    $scope.showCarousel = false;

    mvCachedKits.query().$promise.then(function(collection) {
        collection.forEach(function(kit) {
            if (kit._id === $routeParams.id) {
                $scope.kit = kit;
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

    function addImagesToCarousel(imageIds){
      imageIds.forEach(function(imageId) {
        mvCachedKits.image(imageId).then(function(image) {
          // TODO: check image type, png, jpeg, gif
          $scope.addSlide('data:image/png;base64,' + image);
        });
      })
    };
});

