"use strict";
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var userHomeController = (function () {
            function userHomeController(userService, $location, $routeParams, $window, homeService) {
                this.userService = userService;
                this.$location = $location;
                this.$routeParams = $routeParams;
                this.$window = $window;
                this.homeService = homeService;
                this.userBeers = homeService.getUserHomeBeers();
            }
            ;
            return userHomeController;
        }());
        Controllers.userHomeController = userHomeController;
        ;
        angular.module("app").controller("userHomeController", userHomeController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
;
