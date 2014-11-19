angular.module('app').controller('mvKitDetailCtrl', function($log, $scope, $routeParams, $modal, mvCachedKits) {
    mvCachedKits.query().$promise.then(function(collection) {
        collection.forEach(function(kit) {
            if (kit._id === $routeParams.id) {
                $scope.kit = kit;
            }
        })
    });

    $scope.uploadImage = function() {
        var modalInstance = $modal.open({
            templateUrl: '/partials/kits/image-upload',
            controller: 'mvImageUploadCtrl'
        });

        modalInstance.result.then(function () {
          $log.info('Modal closed at: ' + new Date());
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
    };

    var slides = $scope.slides = [];
    $scope.addSlide = function() {
      var newWidth = 600 + slides.length + 1;
      slides.push({
        image: 'http://placekitten.com/' + newWidth + '/300',
        text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
          ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
      });
    };

    /*for (var i=0; i<4; i++) {
      $scope.addSlide();
    };*/
});