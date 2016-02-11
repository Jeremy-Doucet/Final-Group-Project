'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var BeerCreateController = (function () {
            function BeerCreateController(HomeService, $location) {
                this.HomeService = HomeService;
                this.$location = $location;
                this.beer = {};
            }
            BeerCreateController.prototype.createBeer = function () {
                var _this = this;
                this.HomeService.saveBeer(this.beer).then(function (res) {
                    _this.$location.path('/');
                });
            };
            return BeerCreateController;
        }());
        Controllers.BeerCreateController = BeerCreateController;
        angular.module('app').controller('BeerCreateController', BeerCreateController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
