"use strict";

namespace app.Controllers {

  export class breweryDetailsController {

    public brew;
    public mybeer;
    public chosen;

    public getMyBeer(mybeer) {
      this.homeService.getMyBeer(this.mybeer).then((res) => {
        this.chosen = res;
      });
    };

    constructor(
      private homeService: app.Services.homeService,
      private $routeParams: ng.route.IRouteParamsService,
      private $location: ng.ILocationService
    ) {
      this.brew = homeService.getBrew( $routeParams["id"]);
      this.mybeer = homeService.getMyBeer( $routeParams["id"]).then((res:any) => {
        this.mybeer = res.data;
      });
    };
  };

  angular.module("app").controller("breweryDetailsController", breweryDetailsController);
};
