'use strict';

namespace app.Controllers {

  export class beerPageController {

    public beers;

    constructor(
      private homeService: app.Services.homeService,
      private $location: ng.ILocationService
    ) {
      this.beers = homeService.getAll();
    };
  };
  angular.module('app').controller('beerPageController', beerPageController);
}
