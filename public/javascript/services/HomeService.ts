"use strict";

namespace app.Services {
  export class homeService {
    public beerResource;
    public brewdbResource;
    public beerUserHomeResource;
    public beerUserDetailsResource;

    public searchBeer(beer) {
        return this.brewdbResource.query({id:"beer", name: beer.name }).$promise;
    }
    public getBrew(brew)    {
        return this.brewdbResource.get({ id:brew}).$promise;
    }

    public getMyBeer(mybeer)   {
    var q = this.$q.defer();
    this.$http.get("/api/v1/brewdb/details/" + mybeer).then(function(res){
        q.resolve(res.data);
    }, function(err){
        q.reject(err);
    });
    return q.promise;
    }

    public deleteBeer(beerId){
      return this.beerResource.delete({ _id: beerId }).$promise;
    }

    public updateBeer(beer){
      return this.beerResource.update({ id: beer._id }, beer).$promise;
    }



    public getAll() {
      return this.beerResource.query();
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
      return this.beerResource.save(beer).$promise;
    };

    public getUserHomeBeers(){
      return this.beerUserHomeResource.query();
    }

    public getUserDetailsBeers(userId){
      return this.beerUserDetailsResource.query();
    }

    constructor(
        private $resource: ng.resource.IResourceService,
        private $http: ng.IHttpService,
        private $q: ng.IQService
    ) {
      this.beerResource = $resource('/api/v1/beer/:id', null,
      {
          "update": { method: "PUT"}
      });
      this.brewdbResource = $resource("/api/v1/brewdb/:id", null,
      {
      });
      this.beerUserHomeResource = $resource('/api/v1/beer/userHomeBeers')
      this.beerUserDetailsResource = $resource('/api/v1/beer/userDetailsBeers/:id')
    };
  };
  angular.module('app').service('homeService', homeService);
}
