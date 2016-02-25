"use strict";
var app;
(function (app) {
    var Services;
    (function (Services) {
        var categoryService = (function () {
            function categoryService($resource, $window) {
                this.$resource = $resource;
                this.$window = $window;
                this.beersLocalResource = $resource("/catshell/byLocation/:location");
                this.beersTypeResource = $resource("/catshell/byType/:type");
                this.beersPopularResource = $resource("/catshell/popular");
            }
            categoryService.prototype.getBeersLocal = function (location) {
                return this.beersLocalResource.query({ location: location });
            };
            ;
            categoryService.prototype.getBeersType = function (type) {
                return this.beersTypeResource.query({ type: type });
            };
            ;
            categoryService.prototype.getBeersPopular = function () {
                return this.beersPopularResource.query();
            };
            ;
            ;
            return categoryService;
        }());
        Services.categoryService = categoryService;
        ;
        angular.module("app").service("categoryService", categoryService);
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));
;
