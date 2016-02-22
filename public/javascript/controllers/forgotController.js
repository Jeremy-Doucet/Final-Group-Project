'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var forgotController = (function () {
            function forgotController(resetService, $routeParams) {
                this.resetService = resetService;
                this.$routeParams = $routeParams;
                this.token = $routeParams["id"];
            }
            forgotController.prototype.passwordReset = function () {
                this.resetService.saveReset(this.user).then(function (res) {
                });
            };
            forgotController.prototype.submitReset = function () {
                this.resetService.saveSubmit(this.user, this.token).then(function (res) {
                });
            };
            return forgotController;
        }());
        Controllers.forgotController = forgotController;
        angular.module('app').controller('forgotController', forgotController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
