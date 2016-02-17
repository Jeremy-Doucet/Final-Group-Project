'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var beerUpdateController = (function () {
            function beerUpdateController(homeService, $location, $routeParams) {
                var _this = this;
                this.homeService = homeService;
                this.$location = $location;
                this.$routeParams = $routeParams;
                homeService.getBeer($routeParams['id']).then(function (res) {
                    _this.beer = res;
                });
            }
            beerUpdateController.prototype.update = function (id) {
                var _this = this;
                this.homeService.updateBeer(this.beer).then(function (res) {
                    _this.$location.path('/beerPage');
                });
            };
            ;
            return beerUpdateController;
        }());
        Controllers.beerUpdateController = beerUpdateController;
        angular.module('app').controller('beerUpdateController', beerUpdateController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
