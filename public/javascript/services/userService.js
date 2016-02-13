"use strict";
var app;
(function (app) {
    var Services;
    (function (Services) {
        var userService = (function () {
            function userService($resource, $window) {
                this.$resource = $resource;
                this.$window = $window;
                this.uRegResource = $resource("/usershell/register");
                this.uLoginResource = $resource("/usershell/login");
                this.uHomeResource = $resource("/usershell/:username");
                if (this.getToken())
                    this.setUser();
            }
            userService.prototype.registerUser = function (newUser) {
                return this.uRegResource.save(newUser).$promise;
            };
            ;
            userService.prototype.login = function (user) {
                return this.uLoginResource.save(user).$promise;
            };
            ;
            userService.prototype.setToken = function (token) {
                this.$window.localStorage.setItem("token", token);
            };
            ;
            userService.prototype.getToken = function () {
                return this.$window.localStorage.getItem("token");
            };
            ;
            userService.prototype.setUser = function () {
                var user = JSON.parse(atob(this.$window.localStorage.getItem("token")
                    .split(".")[1]));
            };
            ;
            userService.prototype.loadUHome = function (username) {
                return this.uHomeResource.get({ username: username });
            };
            ;
            userService.prototype.removeToken = function () {
                this.$window.localStorage.clear();
            };
            ;
            ;
            return userService;
        }());
        Services.userService = userService;
        ;
        angular.module("app").service("userService", userService);
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));
;
