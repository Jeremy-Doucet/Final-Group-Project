"use strict";

namespace app.Controllers {

  export class locationHomeController {

    public region;

    constructor(
      private userService: app.Services.userService,
      private $location: ng.ILocationService,
      private $window: ng.IWindowService
    ) {};
  };

  angular.module("app").controller("locationHomeController", locationHomeController);
};
