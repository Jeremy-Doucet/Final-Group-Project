'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var DeleteAddBeerController = (function () {
            function DeleteAddBeerController(DeleteCrudService, $location, $routeParams) {
                this.DeleteCrudService = DeleteCrudService;
                this.$location = $location;
                this.$routeParams = $routeParams;
            }
            DeleteAddBeerController.prototype.delete = function (id) {
                var _this = this;
                this.DeleteCrudService.deleteBeer(id).then(function (res) {
                    _this.beer = _this.beer.filter(function (list) { return list._id !== id; });
                });
            };
            return DeleteAddBeerController;
        }());
        Controllers.DeleteAddBeerController = DeleteAddBeerController;
        angular.module('app').controller('DeleteAddBeerController', DeleteAddBeerController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
