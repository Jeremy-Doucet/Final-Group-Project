"use strict";
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var userController = (function () {
            function userController(userService, $location, $window) {
                this.userService = userService;
                this.$location = $location;
                this.$window = $window;
            }
            userController.prototype.register = function () {
                var _this = this;
                var newUser = {
                    username: this.newUser.username,
                    email: this.newUser.email,
                    avatarUrl: this.newUser.avatarUrl,
                    password: this.newUser.password,
                    pwdConfirm: this.newUser.pwdConfirm
                };
                if (this.newUser.password === this.newUser.pwdConfirm) {
                    this.userService.registerUser(this.newUser).then(function (res) {
                        _this.userService.setToken(res.token);
                        _this.userService.setUser();
                        _this.$window.localStorage.setItem("username", _this.newUser.username);
                        _this.$location.path('/myprofile');
                    });
                }
                else {
                    alert("Passwords do not match");
                }
            };
            ;
            userController.prototype.login = function () {
                var _this = this;
                this.userService.login(this.user).then(function (res) {
                    _this.userService.setToken(res.token);
                    _this.userService.setUser();
                    _this.$window.localStorage.setItem("username", _this.user.username);
                    _this.$location.path(_this.user.username);
                });
            };
            ;
            ;
            return userController;
        }());
        Controllers.userController = userController;
        ;
        angular.module("app").controller("userController", userController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
;
