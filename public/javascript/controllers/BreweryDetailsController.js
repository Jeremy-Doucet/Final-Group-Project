"use strict";
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var breweryDetailsController = (function () {
            function breweryDetailsController(homeService, $routeParams, $location) {
                this.homeService = homeService;
                this.$routeParams = $routeParams;
                this.$location = $location;
                this.brew = homeService.getBrew($routeParams["id"]);
            }
            ;
            return breweryDetailsController;
        }());
        Controllers.breweryDetailsController = breweryDetailsController;
        ;
        angular.module("app").controller("breweryDetailsController", breweryDetailsController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
;
