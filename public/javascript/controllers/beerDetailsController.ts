'use strict';

namespace app.Controllers {

  export class beerDetailsController {

    public beer;

    constructor(
      private homeService: app.Services.homeService,
      private $routeParams: ng.route.IRouteParamsService
    ){
      homeService.getBeer( $routeParams['id'] ).then((res)=>{
        this.beer = res
      });
    }
  }
  angular.module('app').controller('BeerDetailsController', beerDetailsController);
}
