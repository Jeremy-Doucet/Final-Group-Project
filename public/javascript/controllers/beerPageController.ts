'use strict';

namespace app.Controllers {

  export class beerPageController {

    public beers;
    public beer;
    public result;
    public brew;
    public breweries;

    public searchBeer() {
      this.homeService.searchBeer(this.beer).then((res) => {
          this.result = res;
      });
    };

    public searchBrew(brew) {
      this.homeService.getBrew(this.brew).then((res) => {
          this.breweries = res;
      });
    };

    constructor(
      private homeService: app.Services.homeService,
      private $location: ng.ILocationService
    ) {
      this.beers = homeService.getAll();
    };
  };

  angular.module('app').controller('beerPageController', beerPageController);
}
