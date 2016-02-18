"use strict";
var app;
(function (app) {
    var Services;
    (function (Services) {
        var locationService = (function () {
            function locationService($resource) {
                this.$resource = $resource;
                this.locationResource = $resource("/locshell/byLocation/:region");
            }
            locationService.prototype.loadLocHome = function (region) {
                return this.locationResource.get({ location: region });
            };
            ;
            ;
            return locationService;
        }());
        Services.locationService = locationService;
        ;
        angular.module("app").service("locationService", locationService);
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));
;
