'use strict'

namespace app.Controllers {
  export class DeleteAddBeerController {

public beer;

public delete(id) {
  this.DeleteCrudService.deleteBeer(id).then((res)=>{
    this.beer = this.beer.filter((list)=> list._id !== id);
  })
}
 constructor(private DeleteCrudService: app.Services.DeleteCrudService,
 private $location: ng.ILocationService,
private $routeParams: ng.route.IRouteParamsService){

 }


  }
  angular.module('app').controller('DeleteAddBeerController', DeleteAddBeerController);
}
