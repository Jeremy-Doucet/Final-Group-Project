git;
'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var forgotController = (function () {
            function forgotController(resetService, $routeParams, ngToast, $location) {
                this.resetService = resetService;
                this.$routeParams = $routeParams;
                this.ngToast = ngToast;
                this.$location = $location;
                this.token = $routeParams["id"];
            }
            forgotController.prototype.passwordReset = function () {
                var _this = this;
                this.resetService.saveReset(this.user).then(function (res) {
                    _this.$location.path('/');
                    _this.ngToast.success({
                        content: "Your confirmation email has been sent!",
                        verticalPosition: "right",
                        timeout: 2000
                    });
                });
            };
            forgotController.prototype.submitReset = function () {
                var _this = this;
                this.resetService.saveSubmit(this.user, this.token).then(function (res) {
                    _this.$location.path('/');
                    _this.ngToast.success({
                        content: "Your password has been successfully reset!",
                        verticalPosition: "right",
                        timeout: 2000
                    });
                });
            };
            return forgotController;
        }());
        Controllers.forgotController = forgotController;
        angular.module('app').controller('forgotController', forgotController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
