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
                var q = this.$q.defer();
                this.$http.get('/api/v1/beer/details/' + beerId).then(function (res) {
                    q.resolve(res.data);
                }, function (err) {
                    q.reject(err);
                });
                return q.promise;
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
