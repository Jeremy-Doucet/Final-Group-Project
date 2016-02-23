"use strict";
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var categoryHomeController = (function () {
            function categoryHomeController(categoryService, $location, $routeParams, $window) {
                this.categoryService = categoryService;
                this.$location = $location;
                this.$routeParams = $routeParams;
                this.$window = $window;
                this.locHomeImg = "/css/img/" + this.$routeParams["location"] + ".png";
                this.typeHomeImg = "/css/img/" + this.$routeParams["type"] + ".png";
                this.beersLocal = categoryService.getBeersLocal($routeParams["location"]);
                this.beersType = categoryService.getBeersType($routeParams["type"]);
                this.beersPopular = categoryService.getBeersPopular().sort(function (a, b) {
                    var x = a["ranking"];
                    var y = b["ranking"];
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                });
            }
            ;
            return categoryHomeController;
        }());
        Controllers.categoryHomeController = categoryHomeController;
        ;
        angular.module("app").controller("categoryHomeController", categoryHomeController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
;
