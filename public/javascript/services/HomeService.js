"use strict";
var app;
(function (app) {
    var Services;
    (function (Services) {
        var homeService = (function () {
            function homeService($resource, $http, $q) {
                this.$resource = $resource;
                this.$http = $http;
                this.$q = $q;
                this.BeerResource = $resource('/api/v1/beer/:id', null, {
                    "update": { method: "PUT" }
                });
                this.beerUserHomeResource = $resource('/api/v1/beer/userHomeBeers');
                this.beerUserDetailsResource = $resource('/api/v1/beer/userDetailsBeers/:id');
            }
            homeService.prototype.searchBeer = function (beer) {
                return this.BeerResource.query({ id: "beer", name: beer.name }).$promise;
            };
            homeService.prototype.deleteBeer = function (beerId) {
                return this.BeerResource.delete({ _id: beerId }).$promise;
            };
            homeService.prototype.updateBeer = function (beer) {
                return this.BeerResource.update({ id: beer._id }, beer).$promise;
            };
            homeService.prototype.getBrew = function (brew) {
                return this.BeerResource.get({ id: brew });
            };
            ;
            homeService.prototype.getAll = function () {
                return this.BeerResource.query();
            };
            ;
            homeService.prototype.getBeer = function (beerId) {
                var q = this.$q.defer();
                this.$http.get('/api/v1/beer/details/' + beerId).then(function (res) {
                    q.resolve(res.data);
                }, function (err) {
                    q.reject(err);
                });
                return q.promise;
            };
            homeService.prototype.saveBeer = function (beer) {
                return this.BeerResource.save(beer).$promise;
            };
            ;
            homeService.prototype.getUserHomeBeers = function () {
                return this.beerUserHomeResource.query();
            };
            homeService.prototype.getUserDetailsBeers = function (userId) {
                return this.beerUserDetailsResource.query();
            };
            ;
            return homeService;
        }());
        Services.homeService = homeService;
        ;
        angular.module('app').service('homeService', homeService);
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));
;
