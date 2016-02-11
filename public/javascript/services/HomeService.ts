"use strict";

namespace app.Services {

  export class HomeService {

    public BeerResource;

    public getAll(){
      return this.BeerResource.query();
    };

    public saveBeer(beer){
      return this.BeerResource.save(beer).$promise;
    };

    constructor(
      private $resource: ng.resource.IResourceService
    ) {
      this.BeerResource = $resource('/api/v1/beer/:id');
    };
  }

  angular.module('app').service('HomeService', HomeService);
}
