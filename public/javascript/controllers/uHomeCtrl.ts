"use strict";

namespace app.Controllers {

  export class uHomeCtrl {

    public user;
    public loggedInUser;

    constructor(
      private uSvc: app.Services.uSvc,
      private $location: ng.ILocationService,
      private $routeParams: ng.route.IRouteParamsService,
      private $window: ng.IWindowService
    ) {
      this.user = uSvc.loadUHome($routeParams["username"]);
      this.loggedInUser = this.$window.localStorage.getItem("username");
    };
  };

  angular.module("app").controller("uHomeCtrl", uHomeCtrl);
};
