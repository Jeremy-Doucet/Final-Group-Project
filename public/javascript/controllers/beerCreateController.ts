'use strict';
namespace app.Controllers {
  export class beerCreateController {
    public beer;
    public result;
    public brew;
    public mybeer;
    public chosen;


    public searchBeer() {
        this.HomeService.searchBeer(this.beer).then((res) => {
            this.result = res;
        })
    }

    public getMyBeer(mybeer)   {
        this.HomeService.getMyBeer(this.mybeer).then((res) => {
            this.chosen = res;
        })
    }

    public createBeer(){
      this.HomeService.saveBeer(this.beer).then((res) =>{
        this.$location.path('/')
      })
    }


    constructor(
      private HomeService: app.Services.HomeService,
      private $location: ng.ILocationService,
      private $routeParams: ng.route.IRouteParamsService
    ){
        this.brew = HomeService.getBrew( $routeParams["id"]);
        this.mybeer = HomeService.getMyBeer( $routeParams["id"]).then((res:any) =>{
            this.mybeer = res.data;
        });
    }
  }
  angular.module('app').controller('beerCreateController', beerCreateController);
}
