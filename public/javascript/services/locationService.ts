"use strict";

namespace app.Services {

  export class locationService {

    public locationResource;

    public loadLocHome(region) {
      return this.locationResource.get({location: region});
    };

    constructor(
      private $resource: ng.resource.IResourceService
    ) {
      this.locationResource = $resource("/locshell/byLocation/:region");
    };
  };

  angular.module("app").service("locationService", locationService);
};
