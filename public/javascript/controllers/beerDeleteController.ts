'use strict';

namespace app.Controllers {

  export class beerDeleteController {

    public beer;

    public delete(id) {
      this.beerDeleteService.deleteBeer(id).then((res)=> {
        this.beer = this.beer.filter((list)=> list._id !== id);
      });
    };

    constructor(
      private beerDeleteService: app.Services.beerDeleteService,
      private $location: ng.ILocationService,
      private $routeParams: ng.route.IRouteParamsService
    ) {};
  };

  angular.module('app').controller('beerDeleteController', beerDeleteController);
};
