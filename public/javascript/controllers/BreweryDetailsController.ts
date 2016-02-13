"use strict";

namespace app.Controllers {

  export class breweryDetailsController {

    public brew;

    constructor(
      private homeService: app.Services.homeService,
      private $routeParams: ng.route.IRouteParamsService,
      private $location: ng.ILocationService
    ) {
      this.brew = homeService.getBrew( $routeParams["id"]);
    };
  };

  angular.module("app").controller("breweryDetailsController", breweryDetailsController);
};
