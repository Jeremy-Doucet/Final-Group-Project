"use strict";
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var locationHomeController = (function () {
            function locationHomeController(userService, $location, $window) {
                this.userService = userService;
                this.$location = $location;
                this.$window = $window;
            }
            ;
            return locationHomeController;
        }());
        Controllers.locationHomeController = locationHomeController;
        ;
        angular.module("app").controller("locationHomeController", locationHomeController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
;
