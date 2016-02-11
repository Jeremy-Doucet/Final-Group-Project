'use strict';
namespace app.Controllers {
  export class BeerPageController {

    public beers;

    constructor(private HomeService: app.Services.HomeService) {
      this.beers = HomeService.getAll();
    }
  }

  angular.module('app').controller('BeerPageController', BeerPageController);
}
