'use strict';
namespace app.Controllers{
  export class BeerDetailsController{
    public beer;

    constructor(
      private HomeService: app.Services.HomeService,
      private $routeParams: ng.route.IRouteParamsService
    ){
      this.beer = HomeService.getBeer( $routeParams['id'] );
    }
  }
  angular.module('app').controller('BeerDetailsController', BeerDetailsController);
}
