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
                this.beerResource = $resource('/api/v1/beer/:id', null, {
                    "update": { method: "PUT" }
                });
                this.brewdbResource = $resource("/api/v1/brewdb/:id", null, {});
            }
            homeService.prototype.searchBeer = function (beer) {
                return this.brewdbResource.query({ id: "beer", name: beer.name }).$promise;
            };
            homeService.prototype.getBrew = function (brew) {
                return this.brewdbResource.get({ id: brew }).$promise;
            };
            homeService.prototype.getMyBeer = function (mybeer) {
                var q = this.$q.defer();
                this.$http.get("/api/v1/brewdb/details/" + mybeer).then(function (res) {
                    q.resolve(res.data);
                }, function (err) {
                    q.reject(err);
                });
                return q.promise;
            };
            homeService.prototype.getAll = function () {
                return this.beerResource.query();
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
                return this.beerResource.save(beer).$promise;
            };
            ;
            return homeService;
        }());
        Services.homeService = homeService;
        angular.module('app').service('homeService', homeService);
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));
