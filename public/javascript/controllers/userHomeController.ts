"use strict";

namespace app.Controllers {

  export class userHomeController {

    public user;
    public loggedInUser;

    constructor(
      private userService: app.Services.userService,
      private $location: ng.ILocationService,
      private $routeParams: ng.route.IRouteParamsService,
      private $window: ng.IWindowService
    ) {
      this.user = userService.loadUHome($routeParams["username"]);
      this.loggedInUser = this.$window.localStorage.getItem("username");
    };
  };

  angular.module("app").controller("userHomeController", userHomeController);
};
