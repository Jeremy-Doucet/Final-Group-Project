'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var beerDetailsController = (function () {
            function beerDetailsController(homeService, $routeParams) {
                this.homeService = homeService;
                this.$routeParams = $routeParams;
                this.beer = homeService.getBeer($routeParams['id']);
            }
            ;
            return beerDetailsController;
        }());
        Controllers.beerDetailsController = beerDetailsController;
        ;
        angular.module('app').controller('beerDetailsController', beerDetailsController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
