"use strict";
namespace app.Services {
  export class HomeService {
    public BeerResource;
    public brewdbResource;

    public searchBeer(beer) {
        return this.brewdbResource.query({id:"beer", name: beer.name }).$promise;
    }

    public getBrew(brew)    {
        return this.brewdbResource.get({ id:brew});
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

    // public getBrew(brew) {
    //     // return this.BeerResource.get({ id:brew});
    //     var q = this.$q.defer();
    //     this.$http.get("/api/v1/brewdb/details" + brew ).then(function(res) {
    //         q.resolve(res.data);
    //     }, function(err) {
    //         q.reject(err);
    //     });
    //     return q.promise;
    // }


    public getAll(){
      return this.BeerResource.query();
    }

    public getBeer(beerId){
      return this.BeerResource.get({ id: beerId });
    }

    public saveBeer(beer){
      return this.BeerResource.save(beer).$promise;
    }


    constructor(
        private $resource: ng.resource.IResourceService,
        private $http: ng.IHttpService,
        private $q: ng.IQService
    ) {
      this.BeerResource = $resource('/api/v1/beer/:id', null,
      {
          "update": { method: "PUT"}
      });
      this.brewdbResource = $resource("/api/v1/brewdb/:id", null,
      {

      });
    }
  }
  angular.module('app').service('HomeService', HomeService);
}
