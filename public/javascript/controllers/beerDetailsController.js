'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var BeerDetailsController = (function () {
            function BeerDetailsController(HomeService, $routeParams) {
                this.HomeService = HomeService;
                this.$routeParams = $routeParams;
                this.beer = HomeService.getBeer($routeParams['id']);
            }
            return BeerDetailsController;
        }());
        Controllers.BeerDetailsController = BeerDetailsController;
        angular.module('app').controller('BeerDetailsController', BeerDetailsController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
