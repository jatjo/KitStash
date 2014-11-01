angular.module('app').factory('mvCachedKits', function(mvKit) {
    var kitList;

    return {
        query: function() {
            if(!kitList) {
                kitList = mvKit.query();
            }

            return kitList;
        }
    }
});