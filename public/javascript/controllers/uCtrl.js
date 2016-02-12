"use strict";
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var uCtrl = (function () {
            function uCtrl(uSvc, $location, $window) {
                this.uSvc = uSvc;
                this.$location = $location;
                this.$window = $window;
            }
            uCtrl.prototype.register = function () {
                var _this = this;
                var newUser = {
                    username: this.newUser.username,
                    email: this.newUser.email,
                    avatarUrl: this.newUser.avatarUrl,
                    password: this.newUser.password,
                    pwdConfirm: this.newUser.pwdConfirm
                };
                if (this.newUser.password === this.newUser.pwdConfirm) {
                    this.uSvc.registerUser(this.newUser).then(function (res) {
                        _this.uSvc.setToken(res.token);
                        _this.uSvc.setUser();
                        _this.$window.localStorage.setItem("username", _this.newUser.username);
                        _this.$location.path(_this.newUser.username);
                    });
                }
                else {
                    alert("Passwords do not match");
                }
            };
            ;
            uCtrl.prototype.login = function () {
                var _this = this;
                this.uSvc.login(this.user).then(function (res) {
                    _this.uSvc.setToken(res.token);
                    _this.uSvc.setUser();
                    _this.$window.localStorage.setItem("username", _this.user.username);
                    _this.$location.path(_this.user.username);
                });
            };
            ;
            ;
            return uCtrl;
        }());
        Controllers.uCtrl = uCtrl;
        ;
        angular.module("app").controller("uCtrl", uCtrl);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
;
