'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var HomeController = (function () {
            function HomeController(HomeService, uSvc, $location, $window) {
                this.HomeService = HomeService;
                this.uSvc = uSvc;
                this.$location = $location;
                this.$window = $window;
                this.params = $location.search();
                if (this.params.code) {
                    uSvc.setToken(this.params.code);
                    uSvc.setUser();
                    $location.search("code", null);
                    $location.hash("");
                }
            }
            HomeController.prototype.logout = function () {
                this.uSvc.removeAccess();
            };
            ;
            ;
            return HomeController;
        }());
        Controllers.HomeController = HomeController;
        angular.module('app').controller('HomeController', HomeController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
