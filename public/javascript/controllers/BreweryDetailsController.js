<<<<<<< HEAD
"use strict";
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var breweryDetailsController = (function () {
            function breweryDetailsController(homeService, $routeParams, $location) {
                this.homeService = homeService;
                this.$routeParams = $routeParams;
                this.$location = $location;
                this.brew = homeService.getBrew($routeParams["id"]);
            }
            ;
            return breweryDetailsController;
        }());
        Controllers.breweryDetailsController = breweryDetailsController;
        ;
        angular.module("app").controller("breweryDetailsController", breweryDetailsController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
;
=======
"use strict";
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var BreweryDetailsController = (function () {
            function BreweryDetailsController(HomeService, $routeParams, $location) {
                this.HomeService = HomeService;
                this.$routeParams = $routeParams;
                this.$location = $location;
                this.brew = HomeService.getBrew($routeParams["id"]);
            }
            return BreweryDetailsController;
        }());
        Controllers.BreweryDetailsController = BreweryDetailsController;
        angular.module("app").controller("BreweryDetailsController", BreweryDetailsController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
>>>>>>> 1318ad826134883fb334263a8c2d60bef0b96a48
