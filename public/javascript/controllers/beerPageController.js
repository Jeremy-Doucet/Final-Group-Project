'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
<<<<<<< HEAD
        var beerPageController = (function () {
            function beerPageController(homeService, $location) {
                this.homeService = homeService;
                this.$location = $location;
                this.beers = homeService.getAll();
            }
            beerPageController.prototype.searchBeer = function () {
                var _this = this;
                this.homeService.searchBeer(this.beer).then(function (res) {
                    _this.result = res;
                });
            };
            ;
            beerPageController.prototype.searchBrew = function (brew) {
                var _this = this;
                this.homeService.getBrew(this.brew).then(function (res) {
                    _this.breweries = res;
                });
            };
            ;
            ;
            return beerPageController;
=======
        var BeerPageController = (function () {
            function BeerPageController(HomeService, $location) {
                this.HomeService = HomeService;
                this.$location = $location;
                this.beers = HomeService.getAll();
            }
            BeerPageController.prototype.searchBeer = function () {
                var _this = this;
                this.HomeService.searchBeer(this.beer).then(function (res) {
                    _this.result = res;
                });
            };
            BeerPageController.prototype.searchBrew = function (brew) {
                var _this = this;
                this.HomeService.getBrew(this.brew).then(function (res) {
                    _this.breweries = res;
                });
            };
            return BeerPageController;
>>>>>>> 1318ad826134883fb334263a8c2d60bef0b96a48
        }());
        Controllers.beerPageController = beerPageController;
        ;
        angular.module('app').controller('beerPageController', beerPageController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
