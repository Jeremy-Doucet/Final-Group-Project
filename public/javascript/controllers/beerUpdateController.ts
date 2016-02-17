'use strict'
namespace app.Controllers {
  export class beerUpdateController{
    public beer;

    public update(id){
      this.homeService.updateBeer(this.beer).then((res) => {
        this.$location.path('/beerPage');
      });
    }

    constructor(
      private homeService: app.Services.homeService,
      private $location: ng.ILocationService,
      private $routeParams: ng.route.IRouteParamsService
    ){
      homeService.getBeer( $routeParams['id'] ).then((res)=>{
        this.beer = res
      });
    };
  }
  angular.module('app').controller('beerUpdateController', beerUpdateController);
}
