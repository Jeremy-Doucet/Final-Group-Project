'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var homeController = (function () {
            function homeController(homeService, userService, $location, $routeParams, $window) {
                this.homeService = homeService;
                this.userService = userService;
                this.$location = $location;
                this.$routeParams = $routeParams;
                this.$window = $window;
                this.beersPop = this.homeService.getAll();
                this.params = $location.search();
                if (this.params.code) {
                    userService.setToken(this.params.code);
                    userService.setUser();
                    $location.search("code", null);
                    $location.hash("");
                }
                ;
            }
            homeController.prototype.logout = function () {
                this.userService.removeToken();
            };
            ;
            ;
            return homeController;
        }());
        Controllers.homeController = homeController;
        ;
        angular.module('app').controller('homeController', homeController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
;
