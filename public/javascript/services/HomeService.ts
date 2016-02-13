"use strict";

namespace app.Services {

  export class homeService {

    public BeerResource;

    public searchBeer(beer) {
      return this.BeerResource.query({id:"beer", name: beer.name }).$promise;
    };

    public getBrew(brew) {
      return this.BeerResource.get({ id:brew});
    };

    public getAll() {
      return this.BeerResource.query();
    };

    public getBeer(beerId) {
      return this.BeerResource.get({ id: beerId });
    };

    public saveBeer(beer) {
      return this.BeerResource.save(beer).$promise;
    };

    constructor(
      private $resource: ng.resource.IResourceService
    ) {
      this.BeerResource = $resource('/api/v1/beer/:id', null,
      {
          "update": { method: "PUT"}
      });
    };
  };

  angular.module('app').service('homeService', homeService);
}
