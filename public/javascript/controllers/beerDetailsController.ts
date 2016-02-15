'use strict';
namespace app.Controllers{
  export class BeerDetailsController{
    public beer;

    constructor(
      private HomeService: app.Services.HomeService,
      private $routeParams: ng.route.IRouteParamsService
    ){
      HomeService.getBeer( $routeParams['id'] ).then((res)=>{
        this.beer = res
      });
    }
  }
  angular.module('app').controller('BeerDetailsController', BeerDetailsController);
}
