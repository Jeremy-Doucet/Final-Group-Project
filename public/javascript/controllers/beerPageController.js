'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var beerPageController = (function () {
            function beerPageController(homeService, $location, $routeParams) {
                var _this = this;
                this.homeService = homeService;
                this.$location = $location;
                this.$routeParams = $routeParams;
                this.beers = homeService.getAll();
                homeService.getMyBeer($routeParams["id"]).then(function (res) {
                    _this.mybeer = res;
                });
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
        }());
        Controllers.beerPageController = beerPageController;
        ;
        angular.module('app').controller('beerPageController', beerPageController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
;
