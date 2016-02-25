"use strict";
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var updateUserController = (function () {
            function updateUserController(userService, $location, $routeParams, $window, ngToast) {
                this.userService = userService;
                this.$location = $location;
                this.$routeParams = $routeParams;
                this.$window = $window;
                this.ngToast = ngToast;
                this.updateUser = angular.copy(userService.status);
            }
            updateUserController.prototype.update = function () {
                var _this = this;
                var updateUser = {
                    username: this.updateUser.username,
                    email: this.updateUser.email,
                    avatarUrl: this.updateUser.avatarUrl,
                    old_password: this.updateUser.password,
                    new_password: this.updateUser.newpassword,
                    pwdConfirm: this.updateUser.pwdConfirm
                };
                if (this.updateUser.newpassword === this.updateUser.pwdConfirm) {
                    this.userService.updateUser(this.updateUser).then(function (res) {
                        _this.userService.setToken(res.token);
                        _this.userService.setUser();
                        _this.$window.localStorage.setItem("username", _this.updateUser.username);
                        _this.$location.path('/updateUser');
                        _this.ngToast.success({
                            content: "Congrats your profile changes have been saved!",
                            horizontalPosition: "right",
                            timeout: 1200
                        });
                    });
                }
            };
            return updateUserController;
        }());
        Controllers.updateUserController = updateUserController;
        angular.module("app").controller("updateUserController", updateUserController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
