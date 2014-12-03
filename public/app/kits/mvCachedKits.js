angular.module('app').factory('mvCachedKits', function($http, $q, mvKit) {
    var kitList;

    return {
        query: function() {
            if(!kitList) {
                kitList = mvKit.query();
            }

            return kitList;
        },
        image: function(imageId) {
          var dfd = $q.defer();
          $http({
            url: '/api/kits/downloadImage',
            method: 'GET',
            params: {imageId: imageId}
          }).success(function(response) {
              dfd.resolve(response);
          }).error(function(response) {
              dfd.resolve(false);
          });

          return dfd.promise;
        }
    }
});