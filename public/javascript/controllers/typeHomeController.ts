"use strict";

namespace app.Controllers {

  export class typeHomeController {

    public beers;

    public typeHomeType = this.$routeParams["type"];

    public typeHomeImg = "/css/img/" + this.$routeParams["type"] + ".png";

    constructor(
      private homeService: app.Services.homeService,
      private $location: ng.ILocationService,
      private $routeParams: ng.route.IRouteParamsService,
      private $window: ng.IWindowService
    ) {
      this.beers = homeService.getAll();
    };
  };

  angular.module("app").controller("typeHomeController", typeHomeController);
};
