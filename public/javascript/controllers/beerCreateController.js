'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var beerCreateController = (function () {
            function beerCreateController(HomeService, $location, $routeParams) {
                var _this = this;
                this.HomeService = HomeService;
                this.$location = $location;
                this.$routeParams = $routeParams;
                this.hide = false;
                this.brew = HomeService.getBrew($routeParams["id"]);
                this.mybeer = HomeService.getMyBeer($routeParams["id"]).then(function (res) {
                    _this.mybeer = res.data;
                });
            }
            beerCreateController.prototype.searchBeer = function () {
                var _this = this;
                this.HomeService.searchBeer(this.beer).then(function (res) {
                    _this.result = res;
                });
            };
            beerCreateController.prototype.getMyBeer = function (mybeer) {
                var _this = this;
                this.HomeService.getMyBeer(this.mybeer).then(function (res) {
                    _this.chosen = res;
                });
            };
            beerCreateController.prototype.createBeer = function () {
                var _this = this;
                this.HomeService.saveBeer(this.beer).then(function (res) {
                    _this.$location.path('/');
                });
            };
            beerCreateController.prototype.show = function () {
                this.hide = true;
            };
            return beerCreateController;
        }());
        Controllers.beerCreateController = beerCreateController;
        angular.module('app').controller('beerCreateController', beerCreateController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
