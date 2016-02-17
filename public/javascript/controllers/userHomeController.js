"use strict";
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var userHomeController = (function () {
            function userHomeController(userService, $location, $routeParams, $window) {
                this.userService = userService;
                this.$location = $location;
                this.$routeParams = $routeParams;
                this.$window = $window;
                this.user = userService.loadUHome($routeParams["username"]);
                this.loggedInUser = this.$window.localStorage.getItem("username");
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
