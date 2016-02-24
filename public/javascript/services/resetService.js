"use strict";
var app;
(function (app) {
    var Services;
    (function (Services) {
        var resetService = (function () {
            function resetService($resource) {
                this.$resource = $resource;
                this.Resource = $resource('/forgot');
                this.ResourceTwo = $resource('/forgot/reset/:token');
            }
            resetService.prototype.saveReset = function (user) {
                return this.Resource.save(user).$promise;
            };
            ;
            resetService.prototype.saveSubmit = function (usertwo, token) {
                return this.ResourceTwo.save({ token: token }, usertwo).$promise;
            };
            ;
            return resetService;
        }());
        Services.resetService = resetService;
        angular.module('app').service('resetService', resetService);
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));
