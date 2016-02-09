"use strict";

namespace app.Controllers {

  export class fbCtrl {



    constructor(
      private $location: ng.ILocationService,
      private $window: ng.IWindowService
    ) {};
  };

  angular.module("app").controller("fbCtrl", fbCtrl);
};
