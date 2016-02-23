"use strict";
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var breweryDetailsController = (function () {
            function breweryDetailsController(homeService, $routeParams, $location) {
                var _this = this;
                this.homeService = homeService;
                this.$routeParams = $routeParams;
                this.$location = $location;
                this.brew = homeService.getBrew($routeParams["id"]);
                this.mybeer = homeService.getMyBeer($routeParams["id"]).then(function (res) {
                    _this.mybeer = res.data;
                });
            }
            breweryDetailsController.prototype.getMyBeer = function (mybeer) {
                var _this = this;
                this.homeService.getMyBeer(this.mybeer).then(function (res) {
                    _this.chosen = res;
                });
            };
            ;
            ;
            return breweryDetailsController;
        }());
        Controllers.breweryDetailsController = breweryDetailsController;
        ;
        angular.module("app").controller("breweryDetailsController", breweryDetailsController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
;
