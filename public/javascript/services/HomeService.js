"use strict";
var app;
(function (app) {
    var Services;
    (function (Services) {
        var homeService = (function () {
            function homeService($resource) {
                this.$resource = $resource;
                this.BeerResource = $resource('/api/v1/beer/:id', null, {
                    "update": { method: "PUT" }
                });
            }
            homeService.prototype.searchBeer = function (beer) {
                return this.BeerResource.query({ id: "beer", name: beer.name }).$promise;
            };
            ;
            homeService.prototype.getBrew = function (brew) {
                return this.BeerResource.get({ id: brew });
            };
            ;
            homeService.prototype.getAll = function () {
                return this.BeerResource.query();
            };
            ;
            homeService.prototype.getBeer = function (beerId) {
                return this.BeerResource.get({ id: beerId });
            };
            ;
            homeService.prototype.saveBeer = function (beer) {
                return this.BeerResource.save(beer).$promise;
            };
            ;
            ;
            return homeService;
        }());
        Services.homeService = homeService;
        ;
        angular.module('app').service('homeService', homeService);
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));
