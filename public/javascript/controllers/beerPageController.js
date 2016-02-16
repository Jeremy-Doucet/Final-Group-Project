'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var BeerPageController = (function () {
            function BeerPageController(HomeService, $location, $routeParams) {
                var _this = this;
                this.HomeService = HomeService;
                this.$location = $location;
                this.$routeParams = $routeParams;
                this.beers = HomeService.getAll();
                HomeService.getMyBeer($routeParams["id"]).then(function (res) {
                    _this.mybeer = res;
                });
            }
            BeerPageController.prototype.searchBeer = function () {
                var _this = this;
                this.HomeService.searchBeer(this.beer).then(function (res) {
                    _this.result = res;
                });
            };
            BeerPageController.prototype.getMyBeer = function (mybeer) {
                var _this = this;
                this.HomeService.getMyBeer(this.mybeer).then(function (res) {
                    _this.chosen = res;
                });
            };
            BeerPageController.prototype.searchBrew = function (brew) {
                var _this = this;
                this.HomeService.getBrew(this.brew).then(function (res) {
                    _this.breweries = res;
                });
            };
            return BeerPageController;
        }());
        Controllers.BeerPageController = BeerPageController;
        angular.module('app').controller('BeerPageController', BeerPageController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
