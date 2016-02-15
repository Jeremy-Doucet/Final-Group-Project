'use strict';

namespace app.Controllers {
  export class beerDetailsController {
    public beer;

    public deleteBeer(id){
      this.homeService.deleteBeer(this.beer._id).then((res) =>{
        this.$location.path('/beerPage')
      })
    }

    constructor(
      private homeService: app.Services.homeService,
      private $location: ng.ILocationService,
      private $routeParams: ng.route.IRouteParamsService
    ){
      homeService.getBeer( $routeParams['id'] ).then((res)=>{
        this.beer = res
      });
    }
  }
  angular.module('app').controller('BeerDetailsController', beerDetailsController);
}
