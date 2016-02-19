"use strict";
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var locationHomeController = (function () {
            function locationHomeController(homeService, $location, $routeParams, $window) {
                this.homeService = homeService;
                this.$location = $location;
                this.$routeParams = $routeParams;
                this.$window = $window;
                this.locHomeLocation = this.$routeParams["region"];
                this.locHomeImg = "/css/img/" + this.$routeParams["region"] + ".png";
                this.beers = homeService.getLocalBeers(this.locHomeLocation);
            }
            ;
            return locationHomeController;
        }());
        Controllers.locationHomeController = locationHomeController;
        ;
        angular.module("app").controller("locationHomeController", locationHomeController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
;
