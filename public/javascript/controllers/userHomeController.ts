"use strict";

namespace app.Controllers {

  export class userHomeController {
    public user;
    public userBeers;
    public loggedInUser;

    constructor(
      private userService: app.Services.userService,
      private $location: ng.ILocationService,
      private $routeParams: ng.route.IRouteParamsService,
      private $window: ng.IWindowService,
      private homeService: app.Services.homeService
    ) {
      this.userBeers = homeService.getUserHomeBeers();
      this.user = userService.status;
    };
  };

  angular.module("app").controller("userHomeController", userHomeController);
};
