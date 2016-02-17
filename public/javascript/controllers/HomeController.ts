'use strict';

namespace app.Controllers {

  export class homeController {
    public status;
    public params;

    public logout() {
      this.userService.removeToken();
      this.userService.removeUser();
      this.$location.path('/');
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
      this.status = userService.status;
    };
  };

  angular.module('app').controller('homeController', homeController);
};
