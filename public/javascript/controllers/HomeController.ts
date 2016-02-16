'use strict';

namespace app.Controllers {

  export class homeController {

    public params;

    public beersPop;

    public beersLoc;

    public beersType;

    public logout() {
      this.userService.removeToken();
    };

    constructor(
      private homeService: app.Services.homeService,
      private userService: app.Services.userService,
      private $location: ng.ILocationService,
      private $window: ng.IWindowService
    ) {

      this.params = $location.search();
      if (this.params.code) {
        userService.setToken(this.params.code);
        userService.setUser();
        $location.search("code", null);
        $location.hash("");
      };
    };
  };

  angular.module('app').controller('homeController', homeController);
};
