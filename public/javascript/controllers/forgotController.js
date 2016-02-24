'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var forgotController = (function () {
            function forgotController(resetService, $routeParams, $location) {
                this.resetService = resetService;
                this.$routeParams = $routeParams;
                this.$location = $location;
                this.token = $routeParams["id"];
            }
            forgotController.prototype.passwordReset = function () {
                this.resetService.saveReset(this.user);
            };
            forgotController.prototype.submitReset = function () {
                var _this = this;
                this.resetService.saveSubmit(this.user, this.token).then(function (res) {
                    _this.$location.path('/');
                });
            };
            return forgotController;
        }());
        Controllers.forgotController = forgotController;
        angular.module('app').controller('forgotController', forgotController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
