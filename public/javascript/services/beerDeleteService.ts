'use strict';

namespace app.Services {

  export class beerDeleteService {

    public UserResource;

    public deleteBeer(beerId) {
      return this.UserResource.delete({_id: beerId}).$promise;
    };

    constructor(
      private $resource: ng.resource.IResourceService
    ) {};
  };

  angular.module('app').service('beerDeleteService', beerDeleteService);
}
