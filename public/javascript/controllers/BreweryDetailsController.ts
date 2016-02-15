"use strict";

namespace app.Controllers {
    export class BreweryDetailsController{
        public brew;



constructor(
    private HomeService: app.Services.HomeService,
    private $routeParams: ng.route.IRouteParamsService,
    private $location: ng.ILocationService
){
    this.brew = HomeService.getBrew( $routeParams["id"]);
}

    }
    angular.module("app").controller("BreweryDetailsController", BreweryDetailsController);
}
