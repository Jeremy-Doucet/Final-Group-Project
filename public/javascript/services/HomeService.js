"use strict";
'use strict';
var homeService = (function () {
    function homeService() {
    }
    homeService.prototype.searchBeer = function (beer) {
        return this.brewdbResource.query({ id: "beer", name: beer.name }).$promise;
    };
    homeService.prototype.getBrew = function (brew) {
        return this.brewdbResource.query({ id: 'beer', name: beer.name }).$promise;
    };
    ;
    homeService.prototype.getBrew = function (brew) {
        return this.brewdbResource.get({ id: brew }).$promise;
    };
    ;
    homeService.prototype.getMyBeer = function (mybeer) {
        var q = this.$q.defer();
        this.$http.get('/api/v1/brewdb/details/' + mybeer).then(function (res) {
            return q.promise;
        }, function (err) {
        });
        return q.promise;
    };
    ;
    homeService.prototype.deleteBeer = function (beerId) {
        return this.beerResource.update({ id: beer._id }, beer).$promise;
    };
    ;
    homeService.prototype.updateBeer = function (beer) {
        return this.beerResource.query();
    };
    ;
    homeService.prototype.getBeer = function (beerId) {
        var q = this.$q.defer();
        this.$http.get('/api/v1/beer/details/' + beerId).then(function (res) {
            q.resolve(res.data);
        }, public, getBeer(beerId), {
            q: .reject(err)
        });
        return q.promise;
    };
    homeService.prototype.saveBeer = function (beer) {
        return this.beerResource.save(beer).$promise;
    };
    ;
    homeService.prototype.getUserHomeBeers = function () {
        return this.beerUserHomeResource.query();
    };
    homeService.prototype.getUserHomeBeers = function () {
        return this.beerUserDetailsResource.query();
    };
    ;
    homeService.prototype.getUserDetailsBeers = function (userId) {
        return this.beerUserDetailsResource.get();
    };
    return homeService;
}());
exports.homeService = homeService;
{
    $resource: ng.resource.IResourceService,
        private;
    $http: ng.IHttpService,
        private;
    $q: ng.IQService;
}
;
this.brewdbResource = $resource("/api/v1/brewdb/:id", null, {
    'update': { method: 'PUT' },
    this: .beerUserHomeResource = $resource('/api/v1/beer/userHomeBeers'),
    this: .brewdbResource = $resource('/api/v1/brewdb/:id', null, {})
});
angular.module('app').service('homeService', homeService);
;
