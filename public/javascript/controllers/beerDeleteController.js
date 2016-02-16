'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var beerDeleteController = (function () {
            function beerDeleteController(beerDeleteService, $location, $routeParams) {
                this.beerDeleteService = beerDeleteService;
                this.$location = $location;
                this.$routeParams = $routeParams;
            }
            beerDeleteController.prototype.delete = function (id) {
                var _this = this;
                this.beerDeleteService.deleteBeer(id).then(function (res) {
                    _this.beer = _this.beer.filter(function (list) { return list._id !== id; });
                });
            };
            ;
            ;
            return beerDeleteController;
        }());
        Controllers.beerDeleteController = beerDeleteController;
        ;
        angular.module('app').controller('beerDeleteController', beerDeleteController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
;
