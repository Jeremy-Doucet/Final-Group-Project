'use strict';
namespace app.Controllers{
  export class BeerCreateController{
    public beer = {};

    public createBeer(){
      this.HomeService.saveBeer(this.beer).then((res) =>{
        this.$location.path('/')
      })
    }

    constructor(
      private HomeService: app.Services.HomeService,
      private $location: ng.ILocationService
    ){}
  }
  angular.module('app').controller('BeerCreateController', BeerCreateController);
}
