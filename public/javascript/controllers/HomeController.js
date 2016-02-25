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
                var params = $location.search();
                if (params.code) {
                    userService.setToken(params.code);
                    userService.setUser();
                    $location.search('code', null);
                    $location.hash('');
                }
                ;
                this.status = userService.status;
            }
            homeController.prototype.logout = function () {
                this.userService.removeToken();
                this.userService.removeUser();
                this.$location.path('/');
            };
            ;
            homeController.prototype.searchBeer = function () {
                var _this = this;
                this.homeService.searchBeer(this.beer).then(function (res) {
                    _this.result = res;
                    _this.beer.name = "";
                    _this.$location.path('/searchBeer');
                });
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
