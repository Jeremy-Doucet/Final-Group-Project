'use strict';
namespace app.Controllers {
  export class BeerPageController {

    public beers;
    public beer;
    public result;
    public brew;
    public breweries;

    public searchBeer() {
        this.HomeService.searchBeer(this.beer).then((res) => {
            this.result = res;
        })
    }

    public searchBrew(brew) {
        this.HomeService.getBrew(this.brew).then((res) => {
            this.breweries = res;
        })
    }



    constructor(private HomeService: app.Services.HomeService,
                private $location: ng.ILocationService) {
      this.beers = HomeService.getAll();
    }
  }

  angular.module('app').controller('BeerPageController', BeerPageController);
}
