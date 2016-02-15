'use strict';

namespace app.Controllers {

  export class beerCreateController {

    public beer = {};

    public createBeer() {
      this.homeService.saveBeer(this.beer).then((res) => {
        this.$location.path('/');
      });
    };

    constructor(
      private homeService: app.Services.homeService,
      private $location: ng.ILocationService
    ) {};
  };

  angular.module('app').controller('beerCreateController', beerCreateController);
}
