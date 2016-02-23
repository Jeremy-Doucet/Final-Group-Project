"use strict";
var app;
(function (app) {
    var Services;
    (function (Services) {
        var userService = (function () {
            function userService($resource, $window, $http, $q) {
                this.$resource = $resource;
                this.$window = $window;
                this.$http = $http;
                this.$q = $q;
                this.status = { _id: null, email: null, username: null, avatarUrl: null, facebook: { email: null, name: null } };
                this.uRegResource = $resource("/usershell/register");
                this.uLoginResource = $resource("/usershell/login");
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
            userService.prototype.removeToken = function () {
                this.$window.localStorage.clear();
            };
            ;
            userService.prototype.setUser = function () {
                var user = JSON.parse(atob(this.$window.localStorage.getItem("token").split(".")[1]));
                this.status._id = user._id;
                this.status.email = user.email;
                this.status.username = user.username;
                this.status.avatarUrl = user.avatarUrl;
                this.status.facebook.name = user.facebook_name;
                this.status.facebook.email = user.facebook_email;
            };
            ;
            userService.prototype.removeUser = function () {
                this.status._id = null;
                this.status.email = null;
                this.status.username = null;
                this.status.avatarUrl = null;
                this.status.facebook.name = null;
                this.status.facebook.email = null;
            };
            ;
            userService.prototype.getUser = function (userId) {
                var q = this.$q.defer();
                this.$http.get('/usershell/users/' + userId).then(function (res) {
                    q.resolve(res.data);
                }, function (err) {
                    q.reject(err);
                });
                return q.promise;
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
