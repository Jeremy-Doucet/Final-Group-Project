"use strict";

namespace app.Services {

  export class homeService {

    public BeerResource;

    public searchBeer(beer) {
      return this.BeerResource.query({id:"beer", name: beer.name }).$promise;
    }

    public getBrew(brew) {
      return this.BeerResource.get({ id:brew});
    };

    public getAll() {
      return this.BeerResource.query();
    };

    public getBeer(beerId){
      var q = this.$q.defer();
      this.$http.get('/api/v1/beer/details/'+ beerId).then(function(res){
        q.resolve(res.data);
      }, function(err){
        q.reject(err);
      });
      return q.promise;
    }

    public saveBeer(beer) {
      return this.BeerResource.save(beer).$promise;
    };

    constructor(
      private $resource: ng.resource.IResourceService,
      private $http: ng.IHttpService,
      private $q: ng.IQService
    ) {
      this.BeerResource = $resource('/api/v1/beer/:id', null,
      {
          "update": { method: "PUT"}
      });
    };
  };
  angular.module('app').service('homeService', homeService);
};
