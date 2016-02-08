"use strict";
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var uHomeCtrl = (function () {
            function uHomeCtrl(uSvc, $location, $routeParams, $window) {
                this.uSvc = uSvc;
                this.$location = $location;
                this.$routeParams = $routeParams;
                this.$window = $window;
                this.user = uSvc.loadUHome($routeParams["username"]);
                this.loggedInUser = uSvc.loadUHome(this.$window.localStorage.getItem("username"));
            }
            ;
            return uHomeCtrl;
        }());
        Controllers.uHomeCtrl = uHomeCtrl;
        ;
        angular.module("app").controller("uHomeCtrl", uHomeCtrl);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
;
