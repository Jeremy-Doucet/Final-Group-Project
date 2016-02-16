"use strict";
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var BreweryDetailsController = (function () {
            function BreweryDetailsController(HomeService, $routeParams, $location) {
                var _this = this;
                this.HomeService = HomeService;
                this.$routeParams = $routeParams;
                this.$location = $location;
                this.brew = HomeService.getBrew($routeParams["id"]);
                this.mybeer = HomeService.getMyBeer($routeParams["id"]).then(function (res) {
                    _this.mybeer = res.data;
                });
            }
            BreweryDetailsController.prototype.getMyBeer = function (mybeer) {
                var _this = this;
                this.HomeService.getMyBeer(this.mybeer).then(function (res) {
                    _this.chosen = res;
                });
            };
            return BreweryDetailsController;
        }());
        Controllers.BreweryDetailsController = BreweryDetailsController;
        angular.module("app").controller("BreweryDetailsController", BreweryDetailsController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
