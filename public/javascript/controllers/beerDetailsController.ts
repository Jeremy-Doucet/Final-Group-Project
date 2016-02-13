'use strict';

namespace app.Controllers {

  export class beerDetailsController {

    public beer;

    constructor(
      private homeService: app.Services.homeService,
      private $routeParams: ng.route.IRouteParamsService
    ) {
      this.beer = homeService.getBeer( $routeParams['id'] );
    };
  };

  angular.module('app').controller('beerDetailsController', beerDetailsController);
}
