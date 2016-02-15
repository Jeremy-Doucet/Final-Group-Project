'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var beerDetailsController = (function () {
            function beerDetailsController(homeService, $location, $routeParams) {
                var _this = this;
                this.homeService = homeService;
                this.$location = $location;
                this.$routeParams = $routeParams;
                homeService.getBeer($routeParams['id']).then(function (res) {
                    _this.beer = res;
                });
            }
            beerDetailsController.prototype.deleteBeer = function (id) {
                var _this = this;
                this.homeService.deleteBeer(this.beer._id).then(function (res) {
                    _this.$location.path('/beerPage');
                });
            };
            return beerDetailsController;
        }());
        Controllers.beerDetailsController = beerDetailsController;
        angular.module('app').controller('BeerDetailsController', beerDetailsController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
