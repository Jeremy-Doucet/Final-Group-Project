"use strict";
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var searchBeerController = (function () {
            function searchBeerController(HomeService, $location, $routeParams) {
                var _this = this;
                this.HomeService = HomeService;
                this.$location = $location;
                this.$routeParams = $routeParams;
                this.brew = HomeService.getBrew($routeParams["id"]);
                this.mybeer = HomeService.getMyBeer($routeParams["id"]).then(function (res) {
                    _this.mybeer = res.data;
                });
            }
            searchBeerController.prototype.searchBeer = function () {
                var _this = this;
                this.HomeService.searchBeer(this.beer).then(function (res) {
                    _this.result = res;
                });
            };
            searchBeerController.prototype.getMyBeer = function (mybeer) {
                var _this = this;
                this.HomeService.getMyBeer(this.mybeer).then(function (res) {
                    _this.chosen = res;
                });
            };
            return searchBeerController;
        }());
        Controllers.searchBeerController = searchBeerController;
        angular.module("app").controller("searchBeerController", searchBeerController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
