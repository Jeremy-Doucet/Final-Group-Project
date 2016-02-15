'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var beerDetailsController = (function () {
            function beerDetailsController(homeService, $routeParams) {
                var _this = this;
                this.homeService = homeService;
                this.$routeParams = $routeParams;
                homeService.getBeer($routeParams['id']).then(function (res) {
                    _this.beer = res;
                });
            }
            return beerDetailsController;
        }());
        Controllers.beerDetailsController = beerDetailsController;
        angular.module('app').controller('BeerDetailsController', beerDetailsController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
