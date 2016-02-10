'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var BeerPageController = (function () {
            function BeerPageController(HomeService) {
                this.HomeService = HomeService;
                this.beers = HomeService.getAll();
            }
            return BeerPageController;
        }());
        Controllers.BeerPageController = BeerPageController;
        angular.module('app').controller('BeerPageController', BeerPageController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
