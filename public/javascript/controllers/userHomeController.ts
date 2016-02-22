"use strict";

namespace app.Controllers {

  export class userHomeController {
    public user;
    public userBeers;
    public loggedInUser;
    public likedBeers;

    constructor(
      private userService: app.Services.userService,
      private $location: ng.ILocationService,
      private $routeParams: ng.route.IRouteParamsService,
      private $window: ng.IWindowService,
      private homeService: app.Services.homeService,
      private commentService: app.Services.commentService
    ) {
      this.userBeers = homeService.getUserHomeBeers();
      this.likedBeers = commentService.getAllLikes();
    };
  };

  angular.module("app").controller("userHomeController", userHomeController);
};
