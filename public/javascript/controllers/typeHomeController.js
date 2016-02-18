"use strict";
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var typeHomeController = (function () {
            function typeHomeController(homeService, $location, $routeParams, $window) {
                this.homeService = homeService;
                this.$location = $location;
                this.$routeParams = $routeParams;
                this.$window = $window;
                this.typeHomeType = this.$routeParams["type"];
                this.typeHomeImg = "/css/img/" + this.$routeParams["type"] + ".png";
                this.beers = homeService.getAll();
            }
            ;
            return typeHomeController;
        }());
        Controllers.typeHomeController = typeHomeController;
        ;
        angular.module("app").controller("typeHomeController", typeHomeController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
;
