'use strict';
var app;
(function (app) {
    var Services;
    (function (Services) {
        var DeleteCrudService = (function () {
            function DeleteCrudService($resource) {
                this.$resource = $resource;
            }
            DeleteCrudService.prototype.deleteBeer = function (beerId) {
                return this.UserResource.delete({ _id: beerId }).$promise;
            };
            return DeleteCrudService;
        }());
        Services.DeleteCrudService = DeleteCrudService;
        angular.module('app').service('DeleteCrudService', DeleteCrudService);
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));
