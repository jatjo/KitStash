angular.module('app').factory('mvKit', function($resource) {
    var KitResource = $resource('/api/kits/:_id', {_id: "@id"}, {
        update: {method:'PUT', isArray:false}
    });

    return KitResource;
});