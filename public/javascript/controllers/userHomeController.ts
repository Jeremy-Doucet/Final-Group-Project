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
      this.loggedInUser = this.$window.localStorage.getItem("username");
      // if ({message: "No user"}) this.$location.path("/");
      this.userBeers = homeService.getUserHomeBeers();
    };
  };

  angular.module("app").controller("userHomeController", userHomeController);
};
