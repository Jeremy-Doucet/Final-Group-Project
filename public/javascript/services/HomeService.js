"use strict";
var app;
(function (app) {
    var Services;
    (function (Services) {
        var HomeService = (function () {
            function HomeService($resource) {
                this.$resource = $resource;
                this.BeerResource = $resource('/api/v1/beer/:id', null, {
                    "update": { method: "PUT" }
                });
            }
            HomeService.prototype.searchBeer = function (beer) {
                return this.BeerResource.query({ id: "beer", name: beer.name }).$promise;
            };
            HomeService.prototype.getBrew = function (brew) {
                return this.BeerResource.get({ id: brew });
            };
            HomeService.prototype.getAll = function () {
                return this.BeerResource.query();
            };
            HomeService.prototype.getBeer = function (beerId) {
                return this.BeerResource.get({ id: beerId });
            };
            HomeService.prototype.saveBeer = function (beer) {
                return this.BeerResource.save(beer).$promise;
            };
            return HomeService;
        }());
        Services.HomeService = HomeService;
        angular.module('app').service('HomeService', HomeService);
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));
