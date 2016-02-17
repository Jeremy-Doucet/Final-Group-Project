'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var userDetailsController = (function () {
            function userDetailsController(userService, $routeParams) {
                var _this = this;
                this.userService = userService;
                this.$routeParams = $routeParams;
                userService.getUser($routeParams['id']).then(function (res) {
                    _this.user = res;
                });
            }
            return userDetailsController;
        }());
        Controllers.userDetailsController = userDetailsController;
        angular.module('app').controller('userDetailsController', userDetailsController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
