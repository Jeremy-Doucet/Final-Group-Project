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
                if (this.$routeParams["location"])
                    this.beersLocal = categoryService.getBeersLocal($routeParams["location"]);
                if (this.$routeParams["type"])
                    this.beersType = categoryService.getBeersType($routeParams["type"]);
                this.beersPopular = categoryService.getBeersPopular();
            }
            categoryHomeController.prototype.sortByPopular = function (array, key) {
                return this.beersPopular.sort(function (a, b) {
                    return b["ranking"] - a["ranking"];
                });
            };
            ;
            ;
            return categoryHomeController;
        }());
        Controllers.categoryHomeController = categoryHomeController;
        ;
        angular.module("app").controller("categoryHomeController", categoryHomeController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
;
