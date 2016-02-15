'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var BeerDetailsController = (function () {
            function BeerDetailsController(HomeService, $routeParams) {
                var _this = this;
                this.HomeService = HomeService;
                this.$routeParams = $routeParams;
                HomeService.getBeer($routeParams['id']).then(function (res) {
                    _this.beer = res;
                });
            }
            return BeerDetailsController;
        }());
        Controllers.BeerDetailsController = BeerDetailsController;
        angular.module('app').controller('BeerDetailsController', BeerDetailsController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
