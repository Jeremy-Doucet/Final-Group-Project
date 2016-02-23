'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var userHomeController = (function () {
            function userHomeController(userService, $location, $routeParams, $window, homeService, commentService) {
                this.userService = userService;
                this.$location = $location;
                this.$routeParams = $routeParams;
                this.$window = $window;
                this.homeService = homeService;
                this.commentService = commentService;
                this.userBeers = homeService.getUserHomeBeers();
                this.likedBeers = commentService.getAllLikes();
            }
            ;
            return userHomeController;
        }());
        Controllers.userHomeController = userHomeController;
        ;
        angular.module('app').controller('userHomeController', userHomeController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
;
