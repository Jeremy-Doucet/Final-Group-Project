"use strict";

namespace app.Controllers {

  export class categoryHomeController {

    public beersLocal;

    public beersType;

    public beersPopular;

    public locHomeImg = "/css/img/" + this.$routeParams["location"] + ".png";

    public typeHomeImg = "/css/img/" + this.$routeParams["type"] + ".png";

    constructor(
      private categoryService: app.Services.categoryService,
      private $location: ng.ILocationService,
      private $routeParams: ng.route.IRouteParamsService,
      private $window: ng.IWindowService
    ) {
      this.beersLocal = categoryService.getBeersLocal($routeParams["location"]);
      this.beersType = categoryService.getBeersType($routeParams["type"]);
      this.beersPopular = categoryService.getBeersPopular().sort((a, b) => {
        let x = a["ranking"];
        let y = b["ranking"];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      });
    };
  };

  angular.module("app").controller("categoryHomeController", categoryHomeController);
};
