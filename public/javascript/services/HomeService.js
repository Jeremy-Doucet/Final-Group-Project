"use strict";
var app;
(function (app) {
    var Services;
    (function (Services) {
        var HomeService = (function () {
            function HomeService($resource, $http, $q) {
                this.$resource = $resource;
                this.$http = $http;
                this.$q = $q;
                this.BeerResource = $resource('/api/v1/beer/:id', null, {
                    "update": { method: "PUT" }
                });
                this.brewdbResource = $resource("/api/v1/brewdb/:id", null, {});
            }
            HomeService.prototype.searchBeer = function (beer) {
                return this.brewdbResource.query({ id: "beer", name: beer.name }).$promise;
            };
            HomeService.prototype.getBrew = function (brew) {
                return this.brewdbResource.get({ id: brew });
            };
            HomeService.prototype.getMyBeer = function (mybeer) {
                var q = this.$q.defer();
                this.$http.get("/api/v1/brewdb/details/" + mybeer).then(function (res) {
                    q.resolve(res.data);
                }, function (err) {
                    q.reject(err);
                });
                return q.promise;
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
