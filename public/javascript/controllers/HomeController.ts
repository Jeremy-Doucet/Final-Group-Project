'use strict';

namespace app.Controllers {

  export class HomeController {

    public params;

    public logout() {
      this.uSvc.removeToken();
    };

    constructor(
      private HomeService: app.Services.HomeService,
      private uSvc: app.Services.uSvc,
      private $location: ng.ILocationService,
      private $window: ng.IWindowService
    ) {
      this.params = $location.search();
      if (this.params.code) {
        uSvc.setToken(this.params.code);
        uSvc.setUser();
        $location.search("code", null);
        $location.hash("");
      }
    };
  }

  angular.module('app').controller('HomeController', HomeController);
}
