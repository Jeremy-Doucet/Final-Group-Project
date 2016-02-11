"use strict";
var app;
(function (app) {
    var Services;
    (function (Services) {
        var HomeService = (function () {
            function HomeService($resource) {
                this.$resource = $resource;
                this.BeerResource = $resource('/api/v1/beer/:id');
            }
            HomeService.prototype.getAll = function () {
                return this.BeerResource.query();
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
