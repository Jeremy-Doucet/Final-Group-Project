"use strict";

namespace app.Controllers {
    export class BreweryDetailsController{
        public brew;
        public mybeer;
        public chosen;

        public getMyBeer(mybeer)   {
            this.HomeService.getMyBeer(this.mybeer).then((res) => {
                this.chosen = res;
            })
        }


constructor(
    private HomeService: app.Services.HomeService,
    private $routeParams: ng.route.IRouteParamsService,
    private $location: ng.ILocationService
){
    this.brew = HomeService.getBrew( $routeParams["id"]);
    this.mybeer = HomeService.getMyBeer( $routeParams["id"]).then((res:any) =>{
        this.mybeer = res.data;
    });

}
    }
    angular.module("app").controller("BreweryDetailsController", BreweryDetailsController);
}
