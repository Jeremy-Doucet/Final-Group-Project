'use strict';
namespace app.Controllers {
  export class BeerPageController {

    public beers;
    public beer;
    public result;
    public brew;
    public breweries;
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

    public searchBrew(brew) {
        this.HomeService.getBrew(this.brew).then((res) => {
            this.breweries = res;
        })
    }



    constructor(private HomeService: app.Services.HomeService,
                private $location: ng.ILocationService,
                private $routeParams: ng.route.IRouteParamsService
                    ) {
      this.beers = HomeService.getAll();
      HomeService.getMyBeer( $routeParams["id"]).then((res) =>{
          this.mybeer = res
      });
    }
  }

  angular.module('app').controller('BeerPageController', BeerPageController);
}
