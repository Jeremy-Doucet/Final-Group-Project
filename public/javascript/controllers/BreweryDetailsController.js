"use strict";
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var BreweryDetailsController = (function () {
            function BreweryDetailsController(HomeService, $routeParams, $location) {
                this.HomeService = HomeService;
                this.$routeParams = $routeParams;
                this.$location = $location;
                this.brew = HomeService.getBrew($routeParams["id"]);
            }
            return BreweryDetailsController;
        }());
        Controllers.BreweryDetailsController = BreweryDetailsController;
        angular.module("app").controller("BreweryDetailsController", BreweryDetailsController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
