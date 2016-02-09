"use strict";
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var fbCtrl = (function () {
            function fbCtrl($location, $window) {
                this.$location = $location;
                this.$window = $window;
            }
            ;
            return fbCtrl;
        }());
        Controllers.fbCtrl = fbCtrl;
        ;
        angular.module("app").controller("fbCtrl", fbCtrl);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
;
