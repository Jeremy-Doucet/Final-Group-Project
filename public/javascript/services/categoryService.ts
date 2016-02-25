'use strict';

namespace app.Services {

  export class categoryService {

    public beersLocalResource;
    public beersTypeResource;
    public beersPopularResource;

    public getBeersLocal(location) {
      return this.beersLocalResource.query({location: location});
    };

    public getBeersType(type) {
      return this.beersTypeResource.query({type: type});
    };

    public getBeersPopular() {
      return this.beersPopularResource.query();
    };

    constructor(
      private $resource: ng.resource.IResourceService,
      private $window: ng.IWindowService
    ) {
      this.beersLocalResource = $resource('/catshell/byLocation/:location');
      this.beersTypeResource = $resource('/catshell/byType/:type');
      this.beersPopularResource = $resource('/catshell/popular');
    };
  };

  angular.module('app').service('categoryService', categoryService);
};
