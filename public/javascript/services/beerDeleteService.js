'use strict';
var app;
(function (app) {
    var Services;
    (function (Services) {
        var beerDeleteService = (function () {
            function beerDeleteService($resource) {
                this.$resource = $resource;
            }
            beerDeleteService.prototype.deleteBeer = function (beerId) {
                return this.UserResource.delete({ _id: beerId }).$promise;
            };
            ;
            ;
            return beerDeleteService;
        }());
        Services.beerDeleteService = beerDeleteService;
        ;
        angular.module('app').service('beerDeleteService', beerDeleteService);
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));
