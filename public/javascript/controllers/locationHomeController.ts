"use strict";

namespace app.Controllers {

  export class locationHomeController {

    public beers;

    public locHomeLocation = this.$routeParams["region"];

    public locHomeImg = "/css/img/" + this.$routeParams["region"] + ".png";

    constructor(
      private homeService: app.Services.homeService,
      private $location: ng.ILocationService,
      private $routeParams: ng.route.IRouteParamsService,
      private $window: ng.IWindowService
    ) {
      this.beers = homeService.getAll().filter((beer) => {
        if ("location" in beer === this.locHomeLocation) {
          return true;
        } else {
          return false;
        }
      });
    };
  };

  angular.module("app").controller("locationHomeController", locationHomeController);
};
