'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var beerCreateController = (function () {
            function beerCreateController(homeService, $location, $routeParams) {
                var _this = this;
                this.homeService = homeService;
                this.$location = $location;
                this.$routeParams = $routeParams;
                this.beer = { name: "", beerdesc: "", imgbeer: "", brewerydb: { abv: "", breweryName: "", beerType: "", labelImg: "", breweryUrl: "", breweryDesc: "", organic: "" }, ranking: 0 };
                this.hide = false;
                homeService.getBrew($routeParams["id"]).then(function (res) {
                    if (!res.data[0].images)
                        res.data[0].images = {};
                    _this.brew = res.data;
                    _this.beer.brewerydb.breweryName = res.data[0].name;
                    _this.beer.brewerydb.labelImg = res.data[0].images.squareMedium;
                    _this.beer.brewerydb.breweryDesc = res.data[0].description;
                    _this.beer.brewerydb.breweryUrl = res.data[0].website;
                });
                homeService.getMyBeer($routeParams["id"]).then(function (res) {
                    _this.mybeer = res.data;
                    _this.beer.name = res.data.name;
                    _this.beer.brewerydb.abv = res.data.abv;
                    _this.beer.brewerydb.beerType = res.data.style.shortName;
                    _this.beer.brewerydb.organic = res.data.isOrganic;
                    _this.beer.imgbeer = res.data.labels.medium;
                    _this.beer.beerdesc = res.data.style.description;
                });
            }
            beerCreateController.prototype.createBeer = function () {
                var _this = this;
                this.homeService.saveBeer(this.beer).then(function (res) {
                    _this.$location.path('/beerPage');
                });
            };
            ;
            beerCreateController.prototype.show = function () {
                this.hide = true;
            };
            ;
            return beerCreateController;
        }());
        Controllers.beerCreateController = beerCreateController;
        ;
        angular.module('app').controller('beerCreateController', beerCreateController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
;
