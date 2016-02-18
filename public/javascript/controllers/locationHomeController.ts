"use strict";

namespace app.Controllers {

  export class locationHomeController {

    public beers;

    public locHomeImg = "/css/img/" + this.$routeParams["region"] + ".png";

    constructor(
      private locationService: app.Services.locationService,
      private $location: ng.ILocationService,
      private $routeParams: ng.route.IRouteParamsService,
      private $window: ng.IWindowService
    ) {
      this.beers = locationService.loadLocHome($routeParams["region"]);
    };
  };

  angular.module("app").controller("locationHomeController", locationHomeController);
};
