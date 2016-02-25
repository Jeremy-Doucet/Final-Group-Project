'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var searchBeerController = (function () {
            function searchBeerController(homeService, $location, $routeParams) {
                this.homeService = homeService;
                this.$location = $location;
                this.$routeParams = $routeParams;
                this.hide = false;
            }
            searchBeerController.prototype.searchBeer = function () {
                var _this = this;
                this.homeService.searchBeer(this.beer).then(function (res) {
                    _this.result = res;
                });
            };
            ;
            searchBeerController.prototype.getMyBeer = function (mybeer) {
                var _this = this;
                this.homeService.getMyBeer(this.mybeer).then(function (res) {
                    _this.chosen = res;
                });
            };
            ;
            searchBeerController.prototype.searchBrew = function (brew) {
                var _this = this;
                this.homeService.getBrew(this.brew).then(function (res) {
                    _this.breweries = res;
                });
            };
            ;
            searchBeerController.prototype.show = function () {
                this.hide = true;
            };
            ;
            ;
            return searchBeerController;
        }());
        Controllers.searchBeerController = searchBeerController;
        ;
        angular.module('app').controller('searchBeerController', searchBeerController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
;
