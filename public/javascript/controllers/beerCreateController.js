'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var beerCreateController = (function () {
            function beerCreateController(homeService, $location) {
                this.homeService = homeService;
                this.$location = $location;
                this.beer = {};
            }
            beerCreateController.prototype.createBeer = function () {
                var _this = this;
                this.homeService.saveBeer(this.beer).then(function (res) {
                    _this.$location.path('/');
                });
            };
            ;
            ;
            return beerCreateController;
        }());
        Controllers.beerCreateController = beerCreateController;
        ;
        angular.module('app').controller('beerCreateController', beerCreateController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
