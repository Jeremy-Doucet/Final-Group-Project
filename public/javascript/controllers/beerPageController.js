'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var beerPageController = (function () {
            function beerPageController(homeService, $location) {
                this.homeService = homeService;
                this.$location = $location;
                this.beers = homeService.getAll();
            }
            ;
            return beerPageController;
        }());
        Controllers.beerPageController = beerPageController;
        ;
        angular.module('app').controller('beerPageController', beerPageController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
